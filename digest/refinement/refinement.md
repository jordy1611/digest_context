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
If Jordan's reply includes any of the following, add the named company to `~/.openclaw/data/jordan-company-blocklist.md` with today's date (or update the date if already present), then continue with the rest of the reply:
- "skip [Company]"
- "block [Company]"
- "never [Company]"
- "add [Company] to blocklist" / "blocklist [Company]"

Note each blocklist addition in the final email (see [../../assembly/templates/outreach.md](../../assembly/templates/outreach.md)).

---

### STEP 1 — APPLY COVER LETTER FEEDBACK (Sonnet Sub-Agent)

Spawn a Sonnet sub-agent via `sessions_spawn` with `model: "claude-sonnet-4-6"` and `thinking: "enabled"`. Pass it:
- Jordan's reply (his feedback or edits per role)
- The original draft intro for each role from the digest
- The full voice rules from `~/.openclaw/agent-reference/jordan/jordan-cover-letter-system.md`
- The most recent 20 entries from `~/.openclaw/data/jordan-voice-corrections.md`

Instruct the sub-agent:
- If Jordan said "good": return the draft intro unchanged.
- If he provided edits or a rewrite: apply them exactly. Don't reinterpret — use his words.
- If feedback is ambiguous: make the most reasonable edit and note what changed.
- Return the final intro paragraph for each role, keyed by company name.

Wait for completion, retrieve the approved intros, then continue on Haiku.

---

### STEP 2 — UPDATE COMPANY BLOCKLIST
After a role's letter is assembled and sent (see [../../assembly/templates/outreach.md](../../assembly/templates/outreach.md)), append its company to `~/.openclaw/data/jordan-company-blocklist.md` with today's date:
`[Company Name] | [YYYY-MM-DD]`

If the company is already on the list, update its date to today.

---

Next: [../../contacts/contacts.md](../../contacts/contacts.md) — determine company size, identify the team, and find the contact.
