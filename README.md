# Context for Job Digest Project

Context and design docs for Jordan Shryock's job digest. **Documentation only — no code. Nothing here is built yet. This is all design.**

## Navigation

- **[agents.md](agents.md)** — the AI entry point. Any agent working in this repo reads this first: the invariants, which process it is, and exactly which files to load.
- **[steps.md](steps.md)** — the pipeline. What happens, in what order, on which model tier.
- **[files.md](files.md)** — the file map. Where any given thing lives.

## What we're building

Moving the job application tool off OpenClaw into a deployed web app. The digest lands in a database overnight, gets reviewed in a UI, feedback is submitted, AI rewrites the intros, contacts get looked up, and everything assembles into the templates and comes back to the app. Jordan sends the emails himself.

## Database

One row per opportunity, not per digest. Columns for `job_url`, `summary`, `draft`, `my_edits`, `contacts` (jsonb), `final_letter`, plus `status` and `run_date`.

- `text` for all the prose columns. No length worries, no `varchar(255)`.
- `timestamptz`, never `timestamp`.
- One index on `(run_date, status)`, none on the text columns.
- Query the app's table view on `status`, not date, so yesterday's unfinished work doesn't vanish.

## Two agent processes, kept separate

Different triggers, different latency budgets, no shared state except the database.

**Process 1 (cron).** Finding and reading the posting is genuinely agentic — an Agent SDK loop. Summarize and draft-intro are fixed steps, so they're plain API calls with the model tier chosen per step. That's a pipeline, not a subagent hierarchy: it gives per-step logs, and step 3 can be rerun without redoing step 1.

**Process 2.** JSON in, JSON out. A single Haiku call with a structured schema. Not really an agent.

## Part 2 flow

Submit writes feedback and flips status. A worker does rewrite → lookup → assembly. The UI polls until complete.

The status column is the queue, which means how the worker gets triggered is swappable later without touching schema, API, or UI. The rewrite payload stays minimal: guidelines file, original intro, feedback, job summary. Nothing else.

Assembly is template interpolation, not an AI call — otherwise the model quietly rewords the intro that was just tuned.

## Still open

1. **Whether the digest agent runs in Cowork or a self-hosted runner.** The tradeoff: a self-hosted runner talks to Postgres directly with no API layer, while Cowork can't. Choosing Cowork means building an HTTP or MCP surface for that reason specifically.
2. **Where the intro-guidelines file lives.** The argument for keeping it in the repo: both processes share one copy, and `git log` tells you what changed when the intros get worse.
