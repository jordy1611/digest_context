---
name: jordan-job-digest-parsing
description: Part 1, step 1 — find and read postings (gather from sources, extract every role, apply hard rules-based filters). The "genuinely agentic" step in the new pipeline.
---

# Parsing — Find, Extract, Hard-Filter

Part of the initial digest (Part 1). Overview and cross-cutting rules: [steps.md](../../steps.md) § Part 1. Next step: [summary.md](summary.md).

Finding and reading the postings is the genuinely agentic part of Process 1. The Built In fetch, parse, and rules-based filters are code in `digest_agent`; reading the alert emails and pulling every role out of them is the routine's own work.

---

## Step 1: Gather Postings (two sources)

### 1a. Built In Colorado — direct live fetch (always, every run)
This is a live search of roles posted in the **last 24 hours**, not an email feed. Pull it directly every run — don't wait for an email — and prioritize moving on these fast because they're fresh.

**Paginate through the first 2 pages.** The base URL takes an optional `&page=N` parameter and shows 15 roles per page. Fetch these in order:
1. `https://www.builtincolorado.com/jobs/remote/engineering/software-engineering/senior?daysSinceUpdated=1&state=Colorado&country=USA&allLocations=true&page=1`
2. same URL with `&page=2`

Stop early if a page returns "No Results" (an empty page means there are no more fresh roles — don't keep going). Cap at 2 pages even if page 2 is still full; that's ~30 roles, enough for one run. De-dupe across pages so no role appears twice.

**This is now code**: `digest_agent/src/sources/builtin.js`, run via `npm run parse:builtin`.
It fetches the raw HTML directly and parses each card as a unit, returning company,
title, JD link, salary, remote status, location, seniority, posted date, industries,
skills, and description.

**Do not reimplement this by aligning link lists.** An earlier version of this document
described collecting the ordered `/company/` and `/job/` hrefs separately and matching
them by card position, because the old `web_fetch` stripped company names and links.
That approach is wrong and was measured to be wrong: a real page carries 42 `/company/`
links against 12 `/job/` links, roughly four per card, so the two lists are different
lengths and every job after the first mismatch gets attributed to the wrong employer —
silently, with a digest that still looks plausible.

The fetch throws `BuiltInBlockedError` on a non-200, a bot-challenge page, or a response
missing the search-page sentinel. **A block is not an empty job market.** Treat it as a
failure to report at the top of the digest, never as "no roles today."

- Treat anything tagged with an auto-reject industry (see Hard Filters, below) as a hard reject even if the role looks good.

### 1b. Inbox — read unread emails
Read all unread emails in `jordainshryock@agentmail.to` since the last run.

**CRITICAL — these alert emails are multi-role digests, not single-job notifications.** A LinkedIn Job Alert email names ONE role in its subject line but lists **6 or more different roles at different companies in the body**. Otta / Welcome to the Jungle emails behave the same way. You MUST open each alert email's full body and extract **every** role listed inside it — not just the company named in the subject. Reading only the subject-line role is the single biggest way this digest silently shrinks. Two LinkedIn alerts plus one Otta alert typically carry ~15 distinct roles between them. If you extracted only 1 role from a LinkedIn alert, you did it wrong — go back and enumerate the whole body.

Expected senders (non-exhaustive):
- jobalerts-noreply@linkedin.com (2 daily LinkedIn alert emails forwarded here)
- noreply@builtin.com / jobs@builtin.com
- team@wellfound.com / jobs@wellfound.com
- hello@otta.com / jobs@welcometothejungle.com
- notifications@ycombinator.com
- Any sender with "jobs" or "alerts" in the address

If a new sender appears that looks like a job board, flag it in the digest. De-dupe roles that show up in both the Built In fetch and the inbox.

If both sources come back empty, send a short digest saying there were no new postings (and, if the inbox specifically is empty, remind Jordan to point his other alerts at `jordainshryock@agentmail.to`).

After processing: mark inbox emails read. Do not delete.

---

## Step 2: Extract Every Job Posting
**Enumerate every role in every alert email body before filtering.** LinkedIn and Otta/Welcome-to-the-Jungle emails each contain 6+ roles; the subject line names only one of them. Walk the full body of each alert and pull out each distinct role. Do not stop at the first or the headline role.

For each role, capture: company, title, JD link, salary range (if listed), location, company size (if available), years of experience required (if listed in JD), posted date, a brief why-it-might-fit note, and any why-it-might-not flags.

**Report a per-source extraction count** so under-extraction is visible. Track, for each alert email, how many roles you pulled from it (e.g. "LinkedIn alert 'Owner.com...': 7 roles extracted"). Carry these counts into the digest's RUN SUMMARY block as an "Extraction" line: `[N] alert emails read → [M] total roles extracted ([per-email breakdown])`. If any single LinkedIn or Otta alert yields fewer than 3 roles, re-open its body and confirm you didn't truncate.

---

## Step 3: Hard Filters (Rules-Based)
A role must pass ALL of these. Full detail in [../../shared/background.md](../../shared/background.md).

### Company Blocklist
Read [../../data/company-blocklist.json](../../data/company-blocklist.json). For each role, check whether the company appears there. If it does and `appliedOn` is within the last 21 days, hard reject — skip all further analysis. Older than 21 days, allow through: a new role may have opened. Case-insensitive match on company name.

This check runs in code (`digest_agent`), and a missing blocklist file is a hard error rather than an empty list — see [../../data/README.md](../../data/README.md).

### Title Filter
**Accept:** Senior Software Engineer, Senior Software Developer, Software Engineer, Software Developer, Application Developer, Tech Lead.
**Reject:** Non-engineering roles (PM, Designer, QA-only, Program/Project Manager). Pure people-management (EM / Director / VP Engineering that is headcount + 1:1s, not hands-on) — flag instead of reject only if it's a hands-on lead hybrid.

### Location Filter
**Accept:** Fully remote US (default pass). Non-mandatory office in Denver or San Diego is a bonus — note it.
**Reject:** Mandatory in-office or required-hybrid (anywhere). Non-US / visa-required: flag.

### Salary Filter
**Judge every role by the TOP of its posted range, never the bottom.** A range like "$170K–$240K" qualifies on its maximum ($240K), not its minimum. Never reject a role because the low end of its range is under $180K — the low end is irrelevant to this filter.

- **Reject** only if the range's **maximum** is under $180K (e.g. $150K–$179K → reject; a role that *tops out* below $180K).
- **Accept** if the **maximum** is $180K or above. Then tier it by that maximum: $200K+ = "excellent salary"; $180K–$200K = "good salary."
- **Undisclosed:** include, flag "salary unknown." (Target is $200K total comp.)

Sanity check before rejecting on salary: the number you compare to $180K must be the HIGHER of the two range values. If you find yourself citing the low end of a range as the reason for a reject, you've applied this rule backwards — re-check against the maximum.

### Company Size
**Reject:** over 2,000 employees (hard reject).
- Under 1,000: boost (smaller preferred).
- 1,000–2,000: pass.

### Experience Required
**Reject:** roles requiring 7 or more years of experience.

### Role Type
**Reject:** backend-only roles (no frontend responsibility).
**Accept:** frontend roles or full-stack roles where frontend ownership is a primary responsibility — not UI as a nice-to-have.

### Engineering Substance (Fit-Trap Screen)
Apply the fit-trap screen from the cover-letter-system. Down-rank or flag: backend/SRE/infra/billing/distributed-systems roles in nice-culture wrapping; "full-stack" that's backend-heavy with UI as nice-to-have; AI-as-customer-feature (RAG/prompt-eng) rather than internal dev practice; senior title with junior IC scope; role-evolution bait. At least one real good-fit signal (frontend/UI, app architecture, cross-functional product work, end-to-end ownership, or AI tooling as a real duty) should be a main job duty, not an added bonus.

### Industry Hard Rejects
Oil/gas, fossil fuels, defense/weapons, tobacco/vaping, gambling (including fantasy sports), payday lending/debt collection, surveillance/facial recognition for law enforcement, MLM/direct sales, crypto trading/speculative crypto.

### Industry Flags (include, let Jordan decide)
AI companion/character chatbot products, engagement-maximizing social media, founder with recent controversy, heavily greenwashed brands.

### Legacy-Code Flag
Older companies on likely-legacy stacks: **flag, do not reject.** Note the signal (maintain-established-platform language, COBOL/AS400/on-prem-only, decades-old enterprise vendor). He'll judge.

---

Next: [summary.md](summary.md) — infer from the JD, apply judgment-based fit filters, rank and select.
