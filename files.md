# File Architecture and Navigation Map

Entry point: [agents.md](agents.md). Goals/status: [README.md](README.md).

This is organized by process, not by file type. Part 1 and Part 2 are separate agent processes with no shared state except the database (see README) — their steps live in separate folders. `shared/`, `contacts/`, and `assembly/` hold what both processes read or produce.

## Part 1 — Initial Digest (`digest/initial/`)
Read postings → summarize/rank → draft intros → send digest.

- [steps.md](steps.md) § Part 1 — overview, trigger, schedule, and what runs each step. Start here for Part 1.
- [digest/initial/parsing.md](digest/initial/parsing.md) — gather postings, extract every role, hard rules-based filters.
- [digest/initial/summary.md](digest/initial/summary.md) — infer from the JD, judgment-based fit filters, rank and select top 15.
- [digest/initial/draft.md](digest/initial/draft.md) — draft the company-specific intro hook per role.
- [digest/initial/digest.md](digest/initial/digest.md) — compose and send the digest, run reporting, error handling.

## Part 2 — Refinement / Outreach (`digest/refinement/`)
Jordan's reply → rewrite intro → find contact → assemble + send final package. Loops until approval (new architecture) — the old skill ran this as one pass.

- [steps.md](steps.md) § Part 2 — overview, trigger, threading, and what runs each step. Start here for Part 2.
- [digest/refinement/refinement.md](digest/refinement/refinement.md) — parse Jordan's feedback, blocklist commands, rewrite the intro.

## Contact Search (`contacts/`)
- [contacts/contacts.md](contacts/contacts.md) — company size, target team, Exa-primary/Apollo-fallback recon, contact record. Used by Part 2.

## Assembly (`assembly/`)
- [assembly/templates/outreach.md](assembly/templates/outreach.md) — canonical letter template, final-package format. Template interpolation, not an AI call. Used by Part 2.

## Shared Reference (`shared/`)
Read by both processes.

- [shared/background.md](shared/background.md) — job-search criteria: filters, ranking, targeting, sending rules.
- [shared/jordan-cover-letter-system.md](shared/jordan-cover-letter-system.md) — voice rules, canonical letter, intro playbook, fit-trap screen. Wins on anything about writing.
- [shared/jordan-resume.md](shared/jordan-resume.md) — grounding facts, never drift from these.
- [shared/jordan-intro-hook-rules.md](shared/jordan-intro-hook-rules.md) — specific rules pulled from past voice-correction rounds.
- [shared/voice.md](shared/voice.md) — the voice-correction feedback loop mechanism (how corrections get logged and read back before drafting/rewriting).

## Local Setup
- [tools/TOOLSAPIKEYS.md](tools/TOOLSAPIKEYS.md) — API keys, inboxes, local environment specifics. Not shared/committed context in spirit, even though it lives in this repo.

## The Pipeline
- [steps.md](steps.md) — parent index for the step-by-step process itself: the Part 1 → Part 2 flow, in order, linking down into each file above. This map (`files.md`) answers "where does X live"; `steps.md` answers "what happens, in what order."

## Not yet in use
- `skills/` — empty directory, unused stub left over from early scaffolding.
