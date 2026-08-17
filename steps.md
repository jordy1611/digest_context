# Steps — The Pipeline

Parent index for the step-by-step process, across both agent processes. For "where does X file live," see [files.md](files.md). For the AI agent entry point, see [agents.md](agents.md). For project goals/status, see [README.md](README.md).

Two agent processes, kept separate. Different triggers, different latency budgets, no shared state except the database (see [README.md](README.md)).

## Numbering convention
- **This file owns position in the flow.** Part 1 has steps 1-4, Part 2 has steps 1-3. The two parts are separate processes with separate triggers, so their numbering doesn't run continuously.
- **Each step file numbers its own internals from 1.** A file's "Step 1" means step 1 of that file, never step 1 overall. Single-step files (like [digest/initial/draft.md](digest/initial/draft.md)) don't number at all.
- **References that cross a file boundary point by name, not number** ("the Recon and Auto-Pick Contact step"), so renumbering inside a file can never leave a dangling pointer. The pre-split files had exactly that bug: a "Step 7.5" whose Step 7 lived in a different file, plus a Part 1 that skipped Step 8 and a Part 2 that skipped Step 2 entirely.

---

## Part 1 — Initial Digest

**Trigger:** cron, every weekday (Mon-Fri) 8:40am MT, or any time Jordan triggers it manually. Offset from Paige's 8:00am digest.
**Inbox:** `jordainshryock@agentmail.to`. **Delivers to:** `jordanshryock@gmail.com`.
**Stops after delivering the digest.** It does not proceed to outreach and does not contact any company.

Read descriptions → summarize → draft a CV intro → land in the digest.

| Step | File | Model | What happens |
|---|---|---|---|
| 1 | [digest/initial/parsing.md](digest/initial/parsing.md) | `claude-haiku-4-5-20251001` | Find postings (Built In + inbox alerts), extract every role, apply hard rules-based filters. The agentic step (Agent SDK loop). |
| 2 | [digest/initial/summary.md](digest/initial/summary.md) | `claude-haiku-4-5-20251001` | Infer from the JD, apply judgment-based fit filters, rank the pool, keep the top 15. Fixed step. |
| 3 | [digest/initial/draft.md](digest/initial/draft.md) | `claude-sonnet-4-6` | Draft the company-specific intro hook per kept role. Spawned as a sub-agent with `thinking: "enabled"`. Fixed step. |
| 4 | [digest/initial/digest.md](digest/initial/digest.md) | `claude-haiku-4-5-20251001` | Compose and send the digest (old: email; new: database row, reviewed in the app UI), cost reporting, error handling. |

Don't use Sonnet outside step 3. Don't use Haiku for step 3. Hard cost ceiling: $3 per run.

---

## Part 2 — Refinement

**Trigger:** Jordan approving or leaving feedback on intros already drafted. In the new architecture this is a direct conversation, so there is no cron and no fixed latency budget.
**Delivers to:** `jordanshryock@gmail.com` only. Jordan sends the outreach himself.

Approve or leave feedback → recommendations applied to the cover letter → contact search → completed letter + contact sent back, ready for Jordan to send. Repeats until approved (new architecture) — the old workflow ran this once.

| Step | File | Model | What happens |
|---|---|---|---|
| 1 | [digest/refinement/refinement.md](digest/refinement/refinement.md) | `claude-sonnet-4-6` | Parse the reply, handle blocklist commands, rewrite the intro per feedback. Spawned as a sub-agent with `thinking: "enabled"`. |
| 2 | [contacts/contacts.md](contacts/contacts.md) | `claude-haiku-4-5-20251001` | Determine company size and target team, find the contact (Exa primary, Apollo browser fallback). |
| 3 | [assembly/templates/outreach.md](assembly/templates/outreach.md) | none | Interpolate the approved hook into the canonical letter template, send the final package. Template interpolation only, no AI call. |

Step 3 deliberately has no model: assembly is interpolation, not generation, so the model can't quietly reword the intro Jordan just tuned.

**Threading (old email-based flow):** reply to Jordan in the same digest thread he replied to, never as a new standalone email. Capture the `message_id` of his reply and use the AgentMail reply endpoint: `POST /v0/inboxes/jordainshryock@agentmail.to/messages/{message_id}/reply`. The only exception is the Apollo out-of-credits alert, which may be standalone since it's account-level, not per-company.

---

## Shared, not part of either pipeline
Read by both processes rather than owned by one: [shared/](shared/) (voice, background, resume, cover-letter-system, voice-correction loop). See [files.md](files.md) for the full list.
