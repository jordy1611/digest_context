---
name: jordan-job-digest-draft
description: Part 1, step 3 — draft the company-specific intro hook for each role kept out of summary.md. Making a CV intro based on the summaries.
---

# Draft — Intro Hook Per Role

Part of the initial digest (Part 1). Previous step: [summary.md](summary.md). Overview: [steps.md](../../steps.md) § Part 1. Next step: [digest.md](digest.md).

Voice rules and correction history are shared with Part 2's rewrite step — see [../../shared/voice.md](../../shared/voice.md), [../../shared/jordan-intro-hook-rules.md](../../shared/jordan-intro-hook-rules.md), and [../../shared/jordan-cover-letter-system.md](../../shared/jordan-cover-letter-system.md) (wins on anything about writing). Don't duplicate those rules here — read them before drafting.

---

## Draft Outreach Intros (Sonnet Sub-Agent)

This file is a single step — nothing to number.

Spawn a Sonnet sub-agent via `sessions_spawn` with `model: "claude-sonnet-4-6"` and `thinking: "enabled"`. Pass it:
- The full list of qualifying roles with company name, role title, JD summary, stack/product age signal, and any fit notes from the parsing/summary steps
- The contents of `~/.openclaw/agent-reference/jordan/jordan-cover-letter-system.md`
- The most recent 20 entries from `~/.openclaw/data/jordan-voice-corrections.md` (create empty if missing)

Instruct the sub-agent to draft the 1–2 company-specific hook sentences only for each role — NOT the two fixed opener sentences ("I'm reaching out..." and "I care about..."). Those are always the same and Jordan doesn't need to review them.

**Critical output instruction to pass to the sub-agent:** Your final response must contain ONLY the hook sentences as a structured list keyed by company name — no preamble, no explanation, no reasoning. Example format:
```
Jukebox Health: [hook sentence(s)]
Customer.io: [hook sentence(s)]
```
Nothing else.

Wait for the sub-agent to complete. Retrieve **only the last message** from the sub-agent using `sessions_history` with `limit: 1` — do not pull the full session history. Extract the hook sentences from that message and continue to [digest.md](digest.md).

---

Next: [digest.md](digest.md) — compose and send the digest with these drafted intros.
