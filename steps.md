# Steps — The Pipeline

Parent index for the step-by-step process, across both agent processes. For "where does X file live," see [files.md](files.md). For the AI agent entry point, see [agents.md](agents.md). For project goals/status, see [README.md](README.md).

Two agent processes, kept separate. Different triggers, different latency budgets, no shared state except the database (see [README.md](README.md)).

## Numbering convention
- **This file owns position in the flow.** Part 1 has steps 1-4, Part 2 has steps 1-3. The two parts are separate processes with separate triggers, so their numbering doesn't run continuously.
- **Each step file numbers its own internals from 1.** A file's "Step 1" means step 1 of that file, never step 1 overall. Single-step files (like [digest/initial/draft.md](digest/initial/draft.md)) don't number at all.
- **References that cross a file boundary point by name, not number** ("the Recon and Auto-Pick Contact step"), so renumbering inside a file can never leave a dangling pointer. The pre-split files had exactly that bug: a "Step 7.5" whose Step 7 lived in a different file, plus a Part 1 that skipped Step 8 and a Part 2 that skipped Step 2 entirely.

---

## Part 1 — Initial Digest

**Trigger:** the `Daily Job Digest Part 1` routine at claude.ai/code/routines — daily at 8:00am MT, or any time Jordan uses **Run now**.
**Inbox:** `jordainshryock@agentmail.to`. **Delivers to:** `jordanshryock@gmail.com`.
**Stops after delivering the digest.** It does not proceed to outreach and does not contact any company.

Read descriptions → summarize → draft a CV intro → land in the digest.

| Step | File | Runs as | What happens |
|---|---|---|---|
| 1 | [digest/initial/parsing.md](digest/initial/parsing.md) | routine + `digest_agent` tooling | Find postings (Built In + inbox alerts), extract every role, apply hard rules-based filters. |
| 2 | [digest/initial/summary.md](digest/initial/summary.md) | routine | Infer from the JD, apply judgment-based fit filters, rank the pool, keep the top 15. |
| 3 | [digest/initial/draft.md](digest/initial/draft.md) | one subagent per role | Draft the company-specific intro hook. Each role gets a fresh subagent. |
| 4 | [digest/initial/digest.md](digest/initial/digest.md) | `digest_agent` tooling | Compose and send the digest. Template interpolation, no model call. |

### Model selection

**Never pin a model ID in these docs.** They go stale, and the routine form picks the
model anyway. Choose the latest available model of the right tier at the time.

The routine runs on **one** model, chosen in its form — the latest Sonnet is the right
default for the run itself. The drafting step is the exception: it spawns a **subagent
per role on the latest Opus**.

Two separate reasons for that, and the first matters more than the second:

- **Isolation.** A single session writing fifteen intros starts pattern-matching on the
  eleven it already wrote instead of on the voice rules, and quality degrades down the
  list rather than uniformly. A fresh subagent per role sees only the voice files and
  one job summary.
- **Capability.** Intro writing is the step where following the voice rules closely
  actually matters, so it gets the strongest model.

Subagents rather than separate routine runs: routines have a daily run cap per account,
and fifteen runs a morning would risk it while re-cloning the repos each time.

---

## Part 2 — Refinement

**Trigger:** Jordan approving or leaving feedback on intros already drafted. In the new architecture this is a direct conversation, so there is no cron and no fixed latency budget.
**Delivers to:** `jordanshryock@gmail.com` only. Jordan sends the outreach himself.

Approve or leave feedback → recommendations applied to the cover letter → contact search → completed letter + contact sent back, ready for Jordan to send. Repeats until approved (new architecture) — the old workflow ran this once.

| Step | File | Runs as | What happens |
|---|---|---|---|
| 1 | [digest/refinement/refinement.md](digest/refinement/refinement.md) | routine, latest Opus | Parse the feedback, handle blocklist commands, rewrite the intro. One letter per run. |
| 2 | [contacts/contacts.md](contacts/contacts.md) | routine | Determine company size and target team, find the contact (Exa primary). |
| 3 | [assembly/templates/outreach.md](assembly/templates/outreach.md) | tooling, no model | Interpolate the approved hook into the canonical letter template. Template interpolation only, no AI call. |

Part 2 is a **separate routine with an API trigger**, not a schedule: Jordan starts it,
one letter at a time, with his feedback as the fire payload. That gives it its own model
selection — the latest Opus — and the same per-letter isolation as Part 1's drafting.

Step 3 deliberately has no model: assembly is interpolation, not generation, so the model can't quietly reword the intro Jordan just tuned.

**Threading (old email-based flow):** reply to Jordan in the same digest thread he replied to, never as a new standalone email. Capture the `message_id` of his reply and use the AgentMail reply endpoint: `POST /v0/inboxes/jordainshryock@agentmail.to/messages/{message_id}/reply`. The only exception is the Apollo out-of-credits alert, which may be standalone since it's account-level, not per-company.

---

## Shared, not part of either pipeline
Read by both processes rather than owned by one: [shared/](shared/) (voice, background, resume, cover-letter-system, voice-correction loop). See [files.md](files.md) for the full list.
