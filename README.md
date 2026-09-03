# Context for Job Digest Project

Context and design docs for Jordan Shryock's job digest. **Documentation and agent-readable
data. The code lives in a separate repo, [digest_agent](https://github.com/jordy1611/digest_agent).**

The two repos are attached together to each routine and cloned side by side, so the
agent reads its rules from here and runs its tooling from there. Keeping this repo free
of code keeps it a single clean copy of the rules that more than one process reads.

## Navigation

- **[agents.md](agents.md)** — the AI entry point. Any agent working in this repo reads this first: the invariants, which process it is, and exactly which files to load.
- **[steps.md](steps.md)** — the pipeline. What happens, in what order, and what runs it.
- **[files.md](files.md)** — the file map. Where any given thing lives.

## Where this stands

**Part 1 is built.** It runs as the `Daily Job Digest Part 1` routine on Anthropic's
cloud infrastructure, daily at 8:00am MT. It fetches Built In Colorado, reads the alert
emails in `jordainshryock@agentmail.to`, filters, summarizes, and emails Jordan one
digest. Intro drafting is stubbed with a placeholder and comes next.

**Part 2 is not built.** Its docs describe what the OpenClaw system did, which is the
current plan but not a commitment.

### Where it's going

Moving the job application tool off OpenClaw into a deployed web app. The digest lands
in a database overnight, gets reviewed in a UI, feedback is submitted, AI rewrites the
intros, contacts get looked up, and everything assembles into the templates and comes
back to the app. Jordan sends the emails himself.

Today's email delivery is the interim step: it exercises the whole pipeline without
waiting on a database or a UI. The database section below is the next phase, not a
description of what exists.

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

## How it runs

**A Claude Code routine**, not Cowork and not a self-hosted runner. Routines attach one
or more GitHub repos, run on a schedule or an API trigger, and execute on Anthropic's
cloud infrastructure, so nothing depends on a machine Jordan owns being awake.

This also settled the credential question that was blocked on it. There is **no
Anthropic API key**: Claude Code is the agent, so there are no self-managed model calls
to authenticate. Provider keys live in the routine's cloud environment
(`job-digest`), which also sets the network allowlist. Details:
[tools/TOOLSAPIKEYS.md](tools/TOOLSAPIKEYS.md).

### Why AgentMail is not an MCP connector

AgentMail publishes a hosted MCP server, and using it would have been less work. It
exposes all of its tools with no read-only mode, including `send_message`,
`reply_to_message`, and `forward_message` — and a routine may call any tool of an
attached connector without a permission prompt.

This routine runs unattended and reads untrusted content: job descriptions and alert
emails written by strangers. Combining that with an unrestricted send tool puts the one
irreversible thing in [agents.md](agents.md) § 1 — emailing a company — one prompt
injection away, with nobody watching. So AgentMail is called through code in
`digest_agent` with the recipient allowlist enforced there. A rule in code cannot be
talked out of by something in a job posting.

## Still open

1. **Apollo has no home in a hosted routine.** Contact recon is browser-only by rule, and
   a cloud routine has no logged-in browser profile. Either Part 2 drops to Exa-only, or
   recon runs somewhere with a real browser. Decide when Part 2 is built.
2. **The database.** Nothing is provisioned. The schema below is a design, and the digest
   currently arrives by email instead.
3. **Where the intro-guidelines file lives** — [shared/voice.md](shared/voice.md) and
   [shared/jordan-cover-letter-system.md](shared/jordan-cover-letter-system.md) overlap.
   Whether the rewrite payload gets one, the other, or a merged version is unresolved.

## Known inconsistencies to reconcile

These are documented so they aren't rediscovered later. None block current work.

- **Process 2's shape is still provisional.** [steps.md](steps.md) describes three steps: rewrite, contact lookup, then assembly with no model call. That is what the OpenClaw system did, and it is the current plan, but nothing is built yet. Revisit when Part 2 is actually implemented.
- **Step files carry "new-architecture note" blocks** describing the eventual database/UI
  delivery. Email delivery is what Part 1 actually does today, so the body text is
  current and those notes are the forward-looking part. See [agents.md](agents.md) § 5.
- **[shared/jordan-cover-letter-system.md](shared/jordan-cover-letter-system.md) has its own "workflow step 1/2/3"**, unrelated to the pipeline numbering. It's an internal reading order for that document, not pipeline structure. Cosmetic; nothing points at it by number.
- **Credential rotation.** Two AgentMail keys and the Apollo password were committed in
  `165d7c7` and are being rotated rather than scrubbed from history. Jordan's AgentMail
  key has since been rotated twice — once for that commit, once after a debugging session
  printed it into a transcript. **Paige's AgentMail key, exposed by the same commit, and
  the Apollo password still need rotating.**
