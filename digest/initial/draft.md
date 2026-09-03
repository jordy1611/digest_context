---
name: jordan-job-digest-draft
description: Part 1, step 3 — draft the company-specific intro hook for each role kept out of summary.md. Making a CV intro based on the summaries.
---

# Draft — Intro Hook Per Role

Part of the initial digest (Part 1). Previous step: [summary.md](summary.md). Overview: [steps.md](../../steps.md) § Part 1. Next step: [digest.md](digest.md).

Voice rules and correction history are shared with Part 2's rewrite step — see [../../shared/voice.md](../../shared/voice.md), [../../shared/jordan-intro-hook-rules.md](../../shared/jordan-intro-hook-rules.md), and [../../shared/jordan-cover-letter-system.md](../../shared/jordan-cover-letter-system.md) (wins on anything about writing). Don't duplicate those rules here — read them before drafting.

---

## Draft Outreach Intros (one subagent per role)

This file is a single step — nothing to number.

**Spawn a separate subagent for each role, on the latest Opus. Not one subagent for all
of them.** This is the most important thing on this page.

A single session drafting fifteen intros has eleven of its own intros in context by the
time it writes the twelfth. It starts pattern-matching on those instead of on the voice
rules — recent content outranks instructions loaded earlier, and self-consistency
pressure makes it treat its own drift as the established style. The rules aren't
violated so much as gradually outvoted, which is why quality degrades down the list
rather than being uniformly bad. That failure was observed in the previous system.

A fresh subagent per role cannot drift that way: it has never seen another intro.

Pass each subagent **only what it needs for its one role**:
- That single role: company, title, JD summary, stack/product age signal, fit notes
- [../../shared/jordan-cover-letter-system.md](../../shared/jordan-cover-letter-system.md)
- [../../shared/jordan-intro-hook-rules.md](../../shared/jordan-intro-hook-rules.md)
- [../../shared/jordan-resume.md](../../shared/jordan-resume.md) — grounding facts
- The most recent 20 entries from [../../data/voice-corrections.md](../../data/voice-corrections.md)

Nothing else. Every extra token in that context competes with the voice rules.

Instruct it to draft the 1–2 company-specific hook sentences **only** — NOT the two
fixed opener sentences ("I'm reaching out..." and "I care about..."). Those never change
and Jordan doesn't need to review them.

**Critical output instruction:** the final response must contain ONLY the hook
sentences — no preamble, no explanation, no reasoning.

Collect each subagent's result and continue to [digest.md](digest.md).

---

Next: [digest.md](digest.md) — compose and send the digest with these drafted intros.
