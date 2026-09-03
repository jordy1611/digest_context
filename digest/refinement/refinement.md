---
name: jordan-job-refinement
description: Part 2, step 1 — parse Jordan's digest reply (approvals, edits, blocklist commands) and rewrite each intro accordingly. In the new architecture this repeats until Jordan approves, instead of running once.
---

# Refinement — Apply Feedback

Part of the outreach workflow (Part 2). Overview and cross-cutting rules: [steps.md](../../steps.md) § Part 2. Next step: [../../contacts/contacts.md](../../contacts/contacts.md) (contact search), then [../../assembly/templates/outreach.md](../../assembly/templates/outreach.md) (assemble + send).

**Note for the rebuild:** the old workflow below treats this as a single pass — one round of edits, no revision loop ("Apply Jordan's edits exactly once. No further revision loop."). The new version repeats this step until Jordan approves: submit writes feedback and flips status, a worker does rewrite → lookup → assembly, the UI polls until complete, and Jordan can submit feedback again if the rewrite still isn't right. Everything below is moved as-is from the old single-pass version — the looping behavior isn't reflected here yet.

Voice rules and the correction log are shared with Part 1's draft step — see [../../shared/voice.md](../../shared/voice.md), [../../shared/jordan-intro-hook-rules.md](../../shared/jordan-intro-hook-rules.md), and [../../shared/jordan-cover-letter-system.md](../../shared/jordan-cover-letter-system.md) (wins on anything about writing).

The new architecture's rewrite payload is meant to stay minimal: guidelines file, original intro, Jordan's feedback, job summary. Nothing else.

---

### TRIGGER
Jordan replies to his daily digest with feedback on one or more draft intros. His reply may include "good" to approve as-is, or specific edits/rewrites to the intro hook.

**Blocklist commands — handle before anything else:**
If Jordan's feedback includes any of the following, add the named company to [../../data/company-blocklist.json](../../data/company-blocklist.json) with today's date (or refresh the date if already present), then continue with the rest of the feedback:
- "skip [Company]"
- "block [Company]"
- "never [Company]"
- "add [Company] to blocklist" / "blocklist [Company]"

Note each blocklist addition in the final email (see [../../assembly/templates/outreach.md](../../assembly/templates/outreach.md)).

---

### STEP 1 — APPLY COVER LETTER FEEDBACK

Part 2 runs on the latest Opus and handles **one letter per run**, fired with Jordan's
feedback as the payload. That gives each rewrite the same isolation as Part 1's
drafting: a run never sees another letter.

Load only:
- Jordan's feedback for this role
- The original draft intro from the digest
- [../../shared/jordan-cover-letter-system.md](../../shared/jordan-cover-letter-system.md)
- [../../shared/jordan-intro-hook-rules.md](../../shared/jordan-intro-hook-rules.md)
- The most recent 20 entries from [../../data/voice-corrections.md](../../data/voice-corrections.md)

Then:
- If Jordan said "good": return the draft intro unchanged.
- If he provided edits or a rewrite: apply them exactly. Don't reinterpret — use his words.
- If feedback is ambiguous: make the most reasonable edit and note what changed.
- Return the final intro paragraph for each role, keyed by company name.

Carry the approved intro into the next step.

---

### STEP 2 — UPDATE COMPANY BLOCKLIST
After a role's letter is assembled and sent (see [../../assembly/templates/outreach.md](../../assembly/templates/outreach.md)), append its company to [../../data/company-blocklist.json](../../data/company-blocklist.json) with today's date:
`[Company Name] | [YYYY-MM-DD]`

If the company is already on the list, update its date to today.

---

Next: [../../contacts/contacts.md](../../contacts/contacts.md) — determine company size, identify the team, and find the contact.
