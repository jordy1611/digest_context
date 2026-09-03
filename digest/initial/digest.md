---
name: jordan-job-digest-compose
description: Part 1, step 4 — compose and send the digest (or, in the new architecture, write the reviewed rows to the database), plus cost reporting and error handling for the whole Part 1 run.
---

# Digest — Compose, Send, Cost, Errors

Part of the initial digest (Part 1). Previous step: [draft.md](draft.md). Overview: [steps.md](../../steps.md) § Part 1.

**Note for the rebuild:** this step describes the old email-based delivery. In the new architecture the digest lands in the database overnight (one row per opportunity, `status` set to something like "pending review") and Jordan reviews it in the app UI instead of an inbox — this file hasn't been updated for that yet, it's a straight move of the old content. Revisit when the UI/DB layer is built.

---

## Step 1: Compose and Send the Digest
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
AI / model tokens: [see note below — not measurable from inside the run]
Web searches: [count]
```

---

## Step 2: Cost Management and Reporting
- **A routine cannot see its own token usage.** The run happens inside a Claude Code session billed to the subscription, and no token counts are exposed to the code composing the digest. So the digest reports "not measured this run" and points at claude.ai/settings/usage, rather than printing a fabricated figure. A `$0.00` would read as "this run was free," which is worse than saying nothing.
- **Report what IS countable**: roles per source, extraction counts per alert email, and web searches. Those are the numbers that show whether the run did its job.
- Watch consumption at [claude.ai/settings/usage](https://claude.ai/settings/usage). Routines draw down subscription usage like any session and also have a daily run cap per account.
- Web searches in parsing.md / summary.md are limited to fetching JD content when a LinkedIn or Otta/Welcome to the Jungle link isn't directly accessible. All other company research uses the JD itself only.

## Step 3: Error Handling
- **Context limit reached during parsing.md / summary.md:** If the session approaches or hits the context limit, stop and send the digest immediately — never send an empty digest, and never send a separate error email. Because summary.md's Phase A scores every qualifier cheaply before any full write-up, the ranking is already complete when this happens: ship the highest-**ranked** entries you have finished writing, never the first ones you happened to analyze. Add a warning at the top of the digest body: "⚠️ Context limit reached during processing. Showing the top [N] ranked matches of [M] qualifiers — re-run to catch the rest." Include those ranked results (plus near-misses) as normal below the warning.
- Email parse fail: include raw link with "couldn't parse this one, take a look."
- Research returns nothing: include with "limited research available."
- Recon returns nothing: include the role with the web_search LinkedIn query string and "no candidate confirmed — search string included."
- API or browser down: send partial digest, note what failed.
- Can't send digest: retry once after 5 minutes; if still failing, log locally and try next run.

---

## Scope Discipline
This skill is a filter, researcher, and drafter. If asked to apply on Jordan's behalf, schedule meetings, or respond to recruiters: decline and explain.
