---
name: jordan-job-digest-summary
description: Part 1, step 2 — infer from the JD, apply judgment-based fit filters, rank the qualifying pool, and select the top 15. Feeds the drafted intro and the digest entry write-up.
---

# Summary — Infer, Fit-Filter, Rank

Part of the initial digest (Part 1). Previous step: [parsing.md](parsing.md). Overview: [steps.md](../../steps.md) § Part 1. Next step: [draft.md](draft.md).

Everything here runs against the pool that already passed the hard filters in [parsing.md](parsing.md).

---

## Step 1: Infer from the Job Description
Extract everything from the JD itself where possible.

- **What the company does:** infer from the JD description. One plain sentence.
- **Employee count:** use it if listed in the JD. If not listed, mark "unknown" — do not search.
- **Stack/product age:** infer from JD language. Consumer/feature language (new product, user-facing, fast iteration) = greenfield signal. Platform/enterprise language (established platform, scale, reliability, compliance) = legacy/mature signal.

**If the JD link is a LinkedIn or Otta/Welcome to the Jungle URL and the full description isn't accessible:** use web_search to find the same posting on the company's own careers page or another public source (search `[Company] [Role Title] job`). Extract the JD from there. If nothing surfaces, note "limited JD info — fetched from alert email only" and continue with what's available.

Skip: parent company lookup, recent news, any other external research.

---

## Step 2: Fit Filters (Judgment-Based)
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

## Step 3: Rank and Select

**Do this in two phases so the 15 you present are the BEST 15, not the first 15 you happened to analyze.**

### Phase A — Score every qualifier (cheap, one line each)
For EVERY role that passed the hard filters, write a single scoring line — company, title, salary max, and the ranking signals below. Do NOT write full digest entries yet. This pass is deliberately lightweight so it can cover all qualifiers without burning context. Then rank the entire pool by:
1. Salary tier (excellent > good > mid > unknown; reject below floor never appears) — tier by the TOP of the range, per the parsing.md Salary Filter
2. Greenfield / newer-product fit + good-fit substance signals
3. Negative flag count (fewer is better; legacy flag weighs against)
4. Company size (smaller preferred)

### Phase B — Keep the top 15, then write them up
Sort the full scored pool by the ranking above and take the **top 15**. If more than 15 qualified, the surplus is dropped by rank — the lowest-ranked qualifiers fall off; never cut by encounter order. No minimum — return however many qualify, even if it's 1 or 2. Only now write the full digest entry (What they do / Why it's a fit / Flags) for each of the kept 15.

**If the context limit is a risk:** do Phase A for ALL qualifiers first — it's cheap — so the ranking is complete before any truncation. If you must ship partial, ship the highest-**ranked** entries you've written, never the first-analyzed ones. A top-tier inbox role must not be lost just because BuiltIn was processed first. The top-15 cap keeps write-up volume in check; never exceed it. See [digest.md](digest.md) for the error-handling behavior when this happens.

### Close But Not a Fit (Up to 2)
Include with the specific reason each was dropped. Don't pad if fewer than 2 exist.

---

Next: [draft.md](draft.md) — draft the outreach intro hook for each kept role.
