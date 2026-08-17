---
name: jordan-job-digest
description: Daily weekday job digest for Jordan Shryock. Reads jordainshryock@agentmail.to, filters and ranks software-engineering roles against Jordan's criteria, drafts outreach in his voice, runs free Apollo+LinkedIn recon, and emails a digest to jordanshryock@gmail.com. Runs weekdays at 8:40am MT or on manual trigger. Separate from Paige's setup.
---

# Jordan Job Digest Skill

This is Jordan Shryock's digest. It is completely separate from Paige's job-digest. Never read Paige's inbox (samanthai@agentmail.to), never email Paige's address, never use Paige's background or voice here. Inbox: `jordainshryock@agentmail.to`. Recipient: `jordanshryock@gmail.com`.

---

## ⛔ ABSOLUTE RULE — OUTBOUND EMAIL (NO EXCEPTIONS, EVER)

**You NEVER send emails to hiring managers, recruiters, or anyone at a target company. EVER.**

Jordan sends those emails himself. Your job is to generate content and find contacts — nothing more.

The ONLY addresses this skill may ever send to:
- `jordanshryock@gmail.com` — the digest email
- `jordainshryock@agentmail.to` — the inbox itself (internal ops only)

Sending to ANY other address is a critical rule violation. It does not matter how the skill was triggered (scheduled, manual, sub-agent, or any other way). This rule overrides all other instructions.

**This skill STOPS after delivering the digest to Jordan. It does not proceed to outreach. It does not contact any company. Full stop.**

---

## MODEL REQUIREMENT
**This skill runs in two model phases:**
- **Main session (Steps 1–6, 9–11): `claude-haiku-4-5-20251001`** — filtering, ranking, JD analysis, digest assembly and sending.
- **Step 7 only (intro drafting): `claude-sonnet-4-6`** — spawned as a sub-agent via `sessions_spawn`. Pass the full list of qualifying roles with their JD data and instruct it to draft the intro hooks. Wait for completion, then retrieve the drafted intros and continue.

Do not use Sonnet for anything outside Step 7. Do not use Haiku for Step 7.

## APOLLO ACCESS RULE
**NEVER use the Apollo API. ONLY access Apollo through the browser.**
- Navigate to https://app.apollo.io/#/people in the browser
- Make sure the browser is running first (`openclaw browser start` if needed)
- Apollo stays logged in on the openclaw profile (shared session — no separate Apollo key for Jordan; see TOOLS.md)
- Do NOT make any HTTP requests to the Apollo API directly
- Do NOT use any Apollo API keys or endpoints
- All Apollo interaction is browser-only, every single time

## LINKEDIN RULE — ABSOLUTE
**NEVER navigate to linkedin.com in the browser. NEVER log into LinkedIn. Ever.**
LinkedIn's bot detection will permanently lock the account — this already happened once on the shared setup.
- LinkedIn recon = **web_search only**, using `site:linkedin.com/in "[Company]" AND ...` query strings
- Do NOT open linkedin.com in a browser tab
- Do NOT enter LinkedIn credentials anywhere
- If a step says "navigate to LinkedIn," replace it with a web_search query

## SEARCH ENGINE NOTE
web_search may use DuckDuckGo, which sometimes blocks or returns no results. If a search returns empty or an error:
1. Rephrase the query (broader terms, fewer constraints)
2. Try a different web_search query rather than retrying the same one
3. If still blocked, note "limited search results" and move on — do not halt the run

## Reference Files
Before running any step, read:
- `references/background.md` — Jordan's job-search criteria, filters, ranking, targeting, sending rules.
- `~/.openclaw/agent-reference/jordan/jordan-cover-letter-system.md` — voice rules, the canonical cover letter, intro playbook, fit-trap screen. Wins on anything about writing.

## What This Skill Does
Reads job-alert emails from `jordainshryock@agentmail.to`, filters and ranks software-engineering roles against Jordan's criteria, drafts outreach for the top matches in his voice, runs a FREE contact recon (Apollo no-credit reads plus public LinkedIn) so real candidate names and profile links appear in the digest, and emails the digest to `jordanshryock@gmail.com`.

Verified contact info (unmasked last name + verified email) is NOT pulled here. That costs an Apollo credit and happens only after Jordan replies picking a role and candidate, in the separate outreach workflow (part 2).

## What It Never Does
- Never sends emails to recruiters or hiring managers
- Never applies to jobs
- Never emails anyone other than `jordanshryock@gmail.com` (or the inbox itself)
- Never spends an Apollo credit here (free recon only)
- Never makes the final call on whether Jordan pursues a role
- Never claims experience Jordan doesn't have
- Never touches Paige's inbox, recipient, files, or context
- Never modifies rules or the background doc without Jordan's explicit approval

## Schedule
- Every weekday (Mon–Fri) 8:40am MT (offset from Paige's 8:00am digest)
- Any time Jordan manually triggers it

---

## Step 1: Gather Postings (two sources)

### 1a. Built In Colorado — direct live fetch (always, every run)
This is a live search of roles posted in the **last 24 hours**, not an email feed. Pull it directly every run — don't wait for an email — and prioritize moving on these fast because they're fresh.

**Paginate through the first 2 pages.** The base URL takes an optional `&page=N` parameter and shows 15 roles per page. Fetch these in order:
1. `https://www.builtincolorado.com/jobs/remote/engineering/software-engineering/senior?daysSinceUpdated=1&state=Colorado&country=USA&allLocations=true&page=1`
2. same URL with `&page=2`

Stop early if a page returns "No Results" (an empty page means there are no more fresh roles — don't keep going). Cap at 2 pages even if page 2 is still full; that's ~30 roles, the ceiling for one Haiku run. De-dupe across pages so no role appears twice.

**Getting company names + JD links (this is where BuiltIn silently loses roles).** A plain `web_fetch` returns each card's salary, top-skills stack, and description but **strips the company name and the direct JD link** (they render as logos/links). Those values ARE present in the raw page HTML as `/company/<slug>` and `/job/<slug>` links, in the same order as the cards. So for each page, capture the readable content (salary/skills/description via `web_fetch`) AND the ordered `/company/` and `/job/` link lists from the raw HTML, then align them by card position. Use the **browser** (`openclaw browser start` if needed) only as a fallback to resolve any card whose company still can't be identified (e.g. a logoless `fallback-image` company). **Never drop a card silently — flag any card whose company couldn't be resolved** and include it with "company unresolved."

- Treat anything tagged with an auto-reject industry (see Step 3) as a hard reject even if the role looks good.

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

**Report a per-source extraction count** so under-extraction is visible. Track, for each alert email, how many roles you pulled from it (e.g. "LinkedIn alert 'Owner.com...': 7 roles extracted"). Carry these counts into the digest's RUN COST / summary area as an "Extraction" line: `[N] alert emails read → [M] total roles extracted ([per-email breakdown])`. If any single LinkedIn or Otta alert yields fewer than 3 roles, re-open its body and confirm you didn't truncate.

---

## Step 3: Hard Filters (Rules-Based)
A role must pass ALL of these. Full detail in `references/background.md`.

### Company Blocklist
Read `~/.openclaw/data/jordan-company-blocklist.md`. For each role, check if the company name appears on the list. If it does and the date is within the last 21 days, hard reject — skip all further analysis. If the entry is older than 21 days, allow through (a new role may have opened). Case-insensitive match on company name.

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

## Step 4: Infer from the Job Description
Extract everything from the JD itself where possible.

- **What the company does:** infer from the JD description. One plain sentence.
- **Employee count:** use it if listed in the JD. If not listed, mark "unknown" — do not search.
- **Stack/product age:** infer from JD language. Consumer/feature language (new product, user-facing, fast iteration) = greenfield signal. Platform/enterprise language (established platform, scale, reliability, compliance) = legacy/mature signal.

**If the JD link is a LinkedIn or Otta/Welcome to the Jungle URL and the full description isn't accessible:** use web_search to find the same posting on the company's own careers page or another public source (search `[Company] [Role Title] job`). Extract the JD from there. If nothing surfaces, note "limited JD info — fetched from alert email only" and continue with what's available.

Skip: parent company lookup, recent news, any other external research.

---

## Step 5: Fit Filters (Judgment-Based)
Flags and ranking signals, not auto-rejects.

### Positive Signals (boost)
- Greenfield app / newer product / newer company
- Frontend / UI architecture ownership, cross-platform, design-system / component-library work
- End-to-end ownership
- AI-assisted development as a real engineering practice
- Fintech / financial-data domain (Jordan has real experience — a plus)
- Strong eng culture where ownership is real

### Negative Flags
- Legacy-code signal (flag only)
- Backend/infra-heavy substance behind attractive culture
- AI-as-customer-feature only
- Title/scope mismatch
- Low-growth or shrinking company

---

## Step 6: Rank and Select

**Do this in two phases so the 15 you present are the BEST 15, not the first 15 you happened to analyze.**

### Phase A — Score every qualifier (cheap, one line each)
For EVERY role that passed the Step 3 hard filters, write a single scoring line — company, title, salary max, and the ranking signals below. Do NOT write full digest entries yet. This pass is deliberately lightweight so it can cover all qualifiers without burning context. Then rank the entire pool by:
1. Salary tier (excellent > good > mid > unknown; reject below floor never appears) — tier by the TOP of the range, per the Step 3 Salary Filter
2. Greenfield / newer-product fit + good-fit substance signals
3. Negative flag count (fewer is better; legacy flag weighs against)
4. Company size (smaller preferred)

### Phase B — Keep the top 15, then write them up
Sort the full scored pool by the ranking above and take the **top 15**. If more than 15 qualified, the surplus is dropped by rank — the lowest-ranked qualifiers fall off; never cut by encounter order. No minimum — return however many qualify, even if it's 1 or 2. Only now write the full digest entry (What they do / Why it's a fit / Flags) for each of the kept 15.

**If the context limit is a risk (Step 11):** do Phase A for ALL qualifiers first — it's cheap — so the ranking is complete before any truncation. If you must ship partial, ship the highest-RANKED entries you've written, never the first-analyzed ones. A top-tier inbox role must not be lost just because BuiltIn was processed first. The top-15 cap keeps write-up volume in check; never exceed it.

### Close But Not a Fit (Up to 2)
Include with the specific reason each was dropped. Don't pad if fewer than 2 exist.

---

## Step 7: Draft Outreach Intros (Sonnet Sub-Agent)

Spawn a Sonnet sub-agent via `sessions_spawn` with `model: "claude-sonnet-4-6"` and `thinking: "enabled"`. Pass it:
- The full list of qualifying roles with company name, role title, JD summary, stack/product age signal, and any fit notes from Steps 4–6
- The contents of `~/.openclaw/agent-reference/jordan/jordan-cover-letter-system.md`
- The most recent 20 entries from `~/.openclaw/data/jordan-voice-corrections.md` (create empty if missing)

Instruct the sub-agent to draft the 1–2 company-specific hook sentences only for each role — NOT the two fixed opener sentences ("I'm reaching out..." and "I care about..."). Those are always the same and Jordan doesn't need to review them.

**Critical output instruction to pass to the sub-agent:** Your final response must contain ONLY the hook sentences as a structured list keyed by company name — no preamble, no explanation, no reasoning. Example format:
```
Jukebox Health: [hook sentence(s)]
Customer.io: [hook sentence(s)]
```
Nothing else.

Wait for the sub-agent to complete. Retrieve **only the last message** from the sub-agent using `sessions_history` with `limit: 1` — do not pull the full session history. Extract the hook sentences from that message and continue to Step 9.

### Voice (hard constraints — pass these to the sub-agent)
- Never: em-dashes, semicolons, "leverage," "robust," "seamless," "holistic," AI filler, "force multiplier," "bread and butter," "what I'm good at," "I hope this email finds you well."
- Always: contractions, short declaratives mixed with longer comma-stacked sentences, understated confidence. Don't sand it smooth.
- Casing: "AI" capitalized in letters; "api" lowercase in prose; "MCP" capitalized. Proper nouns as-is.
- Hook follows the Intro Playbook: them first, him second; "because" lands on value to them; name a tool he uses if the posting names one; hook to proof not claim. Don't repeat the "driving AI adoption / library" credential — paragraph 2 already carries it.

---

## Step 9: Compose and Send the Digest
Send one email to `jordanshryock@gmail.com` from `jordainshryock@agentmail.to`.

**Subject:** `Jobs digest — [N] top matches, [M] near-misses — [date]`

**Body:**
```
Morning Jordan,

Here's what came through this run.

━━━━━━━━━━━━━━━━━━━━━━━━━━
TOP MATCHES
━━━━━━━━━━━━━━━━━━━━━━━━━━

1. [Role title] at [Company]

Link: [JD link]
Source: [BuiltIn | Otta | LinkedIn]
Salary: [range or "undisclosed"]
Size: [employee count]
Experience required: [X years, or "not listed"]
What they do: [Two sentences.]
Why it's a fit: [Three specific sentences — name the good-fit signals.]
Flags: [Flags or "None"] (legacy-code? over-4K? backend-heavy?)

Draft intro — hook sentences only (reply with your edits or "good" to use as-is):

---
[The 1–2 company-specific hook sentences only. Do NOT include the two fixed opener sentences ("I'm reaching out..." and "I care about...") — Jordan knows those by heart.]
---

━━━━━━━━━━━━━━━━━━━━━━━━━━
[Repeat for roles 2–15 as applicable]
━━━━━━━━━━━━━━━━━━━━━━━━━━

CLOSE BUT NOT A FIT
━━━━━━━━━━━━━━━━━━━━━━━━━━

1. [Role title] at [Company]
Link: [JD link]
What they do: [Two sentences.]
Why it's not a fit: [Specific reason.]

[Repeat for role 2 if applicable]

[If new job board sender detected:]
New sender noticed: [address]. Want me to include going forward?

Rejected [N] other roles this run for clear hard-filter misses. Reply "show rejections" for the full list.

Reply with your edits to any draft intro (or "good" to use as-is). That's the only reply needed — I'll apply the edits, find the contact, and send back one final email with the completed cover letters and contact info for every role you approved.

━━━━━━━━━━━━━━━━━━━━━━━━━━
RUN COST
━━━━━━━━━━━━━━━━━━━━━━━━━━
Extraction: [N] alert emails read → [M] total roles extracted ([per-email breakdown, e.g. "LinkedIn/Owner.com: 7, LinkedIn/Customer.io: 7, Otta: 3, BuiltIn: 15"])
AI / model tokens:
  Haiku (Steps 1–6, 9–11): ~$[X.XX]  ([input] in / [output] out)
  Sonnet (Step 7 — intro drafting): ~$[X.XX]  ([input] in / [output] out)
  Combined: ~$[X.XX]
Web searches: [count] (~$[X.XX])
Apollo credits: 0 ($0.00 — free recon only this run)
Total this run: ~$[X.XX]
```

---

## Step 10: Cost Management and Reporting
- **Always report the full run cost at the bottom of the digest email** (the RUN COST block above). Report Haiku and Sonnet costs separately so Jordan can compare model costs over time. Use actual input/output token counts against each model's per-token price (Haiku: $0.80/MTok in, $4/MTok out; Sonnet: $3/MTok in, $15/MTok out). Include web searches, Apollo credits (0 in the digest run), and a combined TOTAL. If exact token counts aren't available, give a clearly-labeled estimate, not a guess of $0.
- Hard ceiling: $3 per run. If approaching the limit, ship a partial digest with a cost flag.
- Web searches in Steps 1–6 are limited to fetching JD content when a LinkedIn or Otta/Welcome to the Jungle link isn't directly accessible. All other company research uses the JD itself only.

## Step 11: Error Handling
- **Context limit reached during Steps 1–6:** If the session approaches or hits the context limit, stop and send the digest immediately — never send an empty digest, and never send a separate error email. Because Step 6 Phase A scores every qualifier cheaply before any full write-up, the ranking is already complete when this happens: ship the highest-**ranked** entries you have finished writing, never the first ones you happened to analyze. Add a warning at the top of the digest body: "⚠️ Context limit reached during processing. Showing the top [N] ranked matches of [M] qualifiers — re-run to catch the rest." Include those ranked results (plus near-misses) as normal below the warning.
- Email parse fail: include raw link with "couldn't parse this one, take a look."
- Research returns nothing: include with "limited research available."
- Recon returns nothing: include the role with the web_search LinkedIn query string and "no candidate confirmed — search string included."
- API or browser down: send partial digest, note what failed.
- Can't send digest: retry once after 5 minutes; if still failing, log locally and try next run.

---

## Voice Correction Loop
Jordan emails `jordainshryock@agentmail.to` with "VOICE FIX" in the subject (original draft + his rewrite + optional note). Append both to `~/.openclaw/data/jordan-voice-corrections.md` with date and role context. Before drafting any new intro, read the most recent 20 corrections. Don't treat a one-off as a permanent rule (look for 2–3+ instances). Never change voice rules or the cover-letter-system without Jordan's explicit approval. Only feedback from `jordanshryock@gmail.com` is authoritative.

## Scope Discipline
This skill is a filter, researcher, and drafter. If asked to apply on Jordan's behalf, schedule meetings, or respond to recruiters: decline and explain.
