// Built In Colorado — fetch and parse the "posted in the last 24h" senior remote search.
//
// Parsing notes (verified against a live page, 2026-09-02):
//   - Each card is [data-id="job-card"], with id="job-card-<jobId>".
//   - Company and title come from [data-id="company-title"] / [data-id="job-card-title"].
//     Do NOT collect /company/ and /job/ hrefs into two lists and align them by position:
//     each card carries ~4 company links, so the lists are different lengths and the
//     alignment silently misattributes jobs to the wrong employer.
//   - The remaining attributes render as an icon + value pair. The Font Awesome class is
//     the only semantic label on them, so we key off the icon rather than text position
//     or Bootstrap utility classes.
//   - There is no ld+json or __NEXT_DATA__ on the page; markup is the only source.

import * as cheerio from 'cheerio';

const SEARCH_URL =
  'https://www.builtincolorado.com/jobs/remote/engineering/software-engineering/senior' +
  '?daysSinceUpdated=1&state=Colorado&country=USA&allLocations=true';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// Font Awesome icon class -> field name.
const ICON_FIELDS = {
  'fa-sack-dollar': 'salary',
  'fa-house-building': 'remote',
  'fa-trophy': 'level',
  'fa-location-dot': 'location',
  'fa-globe': 'location',
  'fa-clock': 'posted',
  'fa-users': 'companySize',
  'fa-building': 'companySize',
};

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

export function parseJobCards(html) {
  const $ = cheerio.load(html);
  const cards = [];
  const unknownIcons = new Set();

  $('[data-id="job-card"]').each((_, el) => {
    const $card = $(el);
    const jobId = ($card.attr('id') || '').replace('job-card-', '') || null;

    const $title = $card.find('[data-id="job-card-title"]').first();
    const $company = $card.find('[data-id="company-title"]').first();

    const href = $title.attr('href') || null;

    // Icon-keyed attributes. Later duplicates (mobile/desktop render the salary and
    // level twice) are ignored so the first occurrence wins.
    const attrs = {};
    $card.find('i[class*="fa-"]').each((__, icon) => {
      const classes = ($(icon).attr('class') || '').split(/\s+/);
      const value = clean($(icon).parent().parent().find('span').first().text());
      if (!value) return;
      let matched = false;
      for (const c of classes) {
        if (c in ICON_FIELDS) {
          matched = true;
          const field = ICON_FIELDS[c];
          if (!attrs[field]) attrs[field] = value;
        }
      }
      if (!matched) {
        const fa = classes.find((c) => c.startsWith('fa-') && c !== 'fa-regular' && c !== 'fa-solid');
        if (fa) unknownIcons.add(`${fa}=${value.slice(0, 40)}`);
      }
    });

    // Posted badge sits in its own element, not the icon grid.
    const posted =
      attrs.posted || clean($card.find('span:has(i.fa-clock)').first().text()) || null;

    const industries = clean($card.find('div.mb-md.fs-xs.fw-bold').first().text())
      .split(/\s*[•\u2022]\s*/)
      .map(clean)
      .filter(Boolean);

    const $skillsBox = $card.find('span:contains("Top Skills:")').first().parent();
    const skills = $skillsBox
      .find('a, span')
      .map((__, s) => clean($(s).text()))
      .get()
      .filter((s) => s && !/^Top Skills:?$/i.test(s) && s.length < 40);

    // The description is the block immediately preceding the Top Skills box.
    const description = clean(
      $card.find('div.mb-md.fs-xs.fw-bold').first().nextAll('div').not(':has(span:contains("Top Skills:"))').first().text()
    ) || null;

    cards.push({
      source: 'builtin',
      jobId,
      company: clean($company.text()) || null,
      companyUrl: $company.attr('href') ? `https://www.builtincolorado.com${$company.attr('href')}` : null,
      title: clean($title.text()) || null,
      url: href ? `https://www.builtincolorado.com${href}` : null,
      salary: attrs.salary || null,
      remote: attrs.remote || null,
      location: attrs.location || null,
      level: attrs.level || null,
      posted,
      industries,
      skills: [...new Set(skills)],
      description,
    });
  });

  return { cards, unknownIcons: [...unknownIcons] };
}

// Thrown when Built In serves something other than the search page: a bot challenge,
// an error page, or a redirect. Kept distinct from "the page loaded and had no roles"
// so an unattended run can alert instead of reporting a quiet job market.
export class BuiltInBlockedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BuiltInBlockedError';
  }
}

// Present on every real search page; absent on challenge and error pages.
const PAGE_SENTINEL = 'id="jobs-list"';
const BLOCK_SIGNALS = /just a moment|challenge-platform|cf-browser-verification|access denied|captcha/i;

export async function fetchBuiltInPage(page = 1) {
  const url = page > 1 ? `${SEARCH_URL}&page=${page}` : SEARCH_URL;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) {
    throw new BuiltInBlockedError(`Built In page ${page}: HTTP ${res.status}`);
  }
  const html = await res.text();
  const signal = html.match(BLOCK_SIGNALS);
  if (signal) {
    throw new BuiltInBlockedError(`Built In page ${page}: bot challenge ("${signal[0]}")`);
  }
  if (!html.includes(PAGE_SENTINEL)) {
    throw new BuiltInBlockedError(
      `Built In page ${page}: response was not the search page (${html.length} bytes, no ${PAGE_SENTINEL})`
    );
  }
  return html;
}

// Fetches up to `maxPages`, stopping early on an empty page, de-duped by jobId.
export async function fetchBuiltInRoles({ maxPages = 2 } = {}) {
  const seen = new Set();
  const roles = [];
  const diagnostics = [];

  for (let page = 1; page <= maxPages; page++) {
    const html = await fetchBuiltInPage(page);
    const { cards, unknownIcons } = parseJobCards(html);
    diagnostics.push({ page, found: cards.length, unknownIcons });
    if (cards.length === 0) break;
    for (const c of cards) {
      const key = c.jobId || c.url;
      if (key && seen.has(key)) continue;
      if (key) seen.add(key);
      roles.push(c);
    }
  }

  return { roles, diagnostics };
}

// --- CLI -------------------------------------------------------------------
// node src/sources/builtin.js [--pages N] [--json]
import { pathToFileURL } from 'node:url';

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const args = process.argv.slice(2);
  const pagesArg = args.indexOf('--pages');
  const maxPages = pagesArg !== -1 ? Number(args[pagesArg + 1]) : 1;
  const asJson = args.includes('--json');

  const { roles, diagnostics } = await fetchBuiltInRoles({ maxPages });

  if (asJson) {
    console.log(JSON.stringify({ roles, diagnostics }, null, 2));
  } else {
    for (const d of diagnostics) {
      console.log(`page ${d.page}: ${d.found} cards`);
      if (d.unknownIcons.length) console.log(`  unmapped icons: ${d.unknownIcons.join(', ')}`);
    }
    console.log(`\n${roles.length} unique roles\n`);
    for (const r of roles) {
      console.log(`  ${(r.company || '??').padEnd(22)} ${(r.salary || 'no salary').padEnd(20)} ${(r.title || '').slice(0, 55)}`);
      console.log(`  ${''.padEnd(22)} ${r.url}`);
    }
  }
}
