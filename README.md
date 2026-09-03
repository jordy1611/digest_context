# Context for Job Digest Project

Context and design docs for Jordan Shryock's job digest. **Documentation only — no code. Nothing here is built yet. This is all design.**

## Navigation

- **[agents.md](agents.md)** — the AI entry point. Any agent working in this repo reads this first: the invariants, which process it is, and exactly which files to load.
- **[steps.md](steps.md)** — the pipeline. What happens, in what order, and what runs it.
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

**Process 1 (scheduled routine).** A Claude Code routine on Anthropic's cloud infrastructure, running daily. Claude Code *is* the agent — there is no Anthropic API key and no self-managed model calls. The deterministic work (fetching, parsing, rules-based filtering) is code in `digest_agent`; the judgment work (reading alert emails, inferring fit, ranking, summarizing) is the routine itself. Intro drafting spawns one subagent per role so each starts from a clean context.

**Process 2.** A separate routine with an API trigger rather than a schedule. Jordan fires it per letter with his feedback as the payload, so each rewrite runs in isolation on the strongest model.

## Part 2 flow

Submit writes feedback and flips status. A worker does rewrite → lookup → assembly. The UI polls until complete.

The status column is the queue, which means how the worker gets triggered is swappable later without touching schema, API, or UI. The rewrite payload stays minimal: guidelines file, original intro, feedback, job summary. Nothing else.

Assembly is template interpolation, not an AI call — otherwise the model quietly rewords the intro that was just tuned.

## Still open

1. **Whether the digest agent runs in Cowork or a self-hosted runner.** The tradeoff: a self-hosted runner talks to Postgres directly with no API layer, while Cowork can't. Choosing Cowork means building an HTTP or MCP surface for that reason specifically.

   A second argument for that surface: it's also the natural credential boundary. If it exists for Postgres anyway, the AgentMail and Exa calls can sit behind it too, so the agent holds one scoped token instead of three provider keys, and rotating a provider key never touches the agent.
2. **Where the intro-guidelines file lives.** The argument for keeping it in the repo: both processes share one copy, and `git log` tells you what changed when the intros get worse.
3. **How credentials reach a remote agent.** Blocked on (1). `.env` is gitignored, so a clone never carries values — the repo states which variable is needed and the runtime supplies it. A self-hosted runner injects them on the box; a hosted agent needs them in the platform's secret store. Note that Apollo doesn't fit this model at all: it's a browser session, not an API key, so it needs a logged-in browser profile on a machine we control, or replacing Apollo with Exa-only.

## Known inconsistencies to reconcile

These are documented so they aren't rediscovered later. None block current work.

- **Process 2's shape is still provisional.** [steps.md](steps.md) describes three steps: rewrite, contact lookup, then assembly with no model call. That is what the OpenClaw system did, and it is the current plan, but nothing is built yet. Revisit when Part 2 is actually implemented.
- **Step files describe the old email-based system** in their body text, with the new database/UI design called out inline as "new-architecture note" blocks. See [agents.md](agents.md) § 5.
- **[shared/jordan-cover-letter-system.md](shared/jordan-cover-letter-system.md) has its own "workflow step 1/2/3"**, unrelated to the pipeline numbering. It's an internal reading order for that document, not pipeline structure. Cosmetic; nothing points at it by number.
- **Credential rotation is pending.** Two AgentMail keys and the Apollo password were committed in `165d7c7` and are being rotated rather than scrubbed from history. Paige's AgentMail key was exposed by the same commit and needs rotating too, even though it's no longer referenced here.
