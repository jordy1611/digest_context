# TOOLS — Local Setup Notes

Environment-specific setup for this project: which service is used for what, which account, and **which environment variable holds each credential**.

**No secret values live in this file.** Real values go in `.env` at the repo root, which is gitignored. Copy `.env.example` to `.env` and fill it in. If you are an agent and need a credential, read it from the environment variable named below — never expect to find it written down here.

---

## AgentMail

The inbox the digest reads from and delivers to.

- **Inbox:** `jordainshryock@agentmail.to`
  ("jordain" = Jordan + AI, intentional wordplay, not a typo. Same spelling is used for the Apollo login. Verified to exist.)
- **Digest recipient:** `jordanshryock@gmail.com` — the only address this inbox may send to, besides itself.
- **API key:** `$AGENTMAIL_API_KEY`

## Apollo

Contact recon in Part 2. See [../contacts/contacts.md](../contacts/contacts.md) for how it's used.

- **Access rule: browser only, never the API.** No HTTP requests to Apollo endpoints, no Apollo API keys. Recon uses the Apollo browser session on the openclaw profile.
- **Login username:** `jordainshryock@gmail.com` — note this uses the "jordain" spelling, matching the AgentMail inbox, *not* the `jordanshryock@gmail.com` digest address. Confirm this first if a recon login fails.
- **Password:** `$APOLLO_PASSWORD`
- **Base URL** (reference only, not for use): `https://api.apollo.io/v1`
- **Known limitation:** limited contact coverage for large tech companies. Meta/Instagram returned 0 results.
- **CAPTCHA:** if Apollo shows a "verify you are human" screen, stop and notify Jordan. Do not attempt to bypass it.

## Exa

Primary contact search in Part 2, ahead of Apollo. Roughly $0.50 per run.

- **API key:** `$EXA_API_KEY`

---

## Related paths

- Skills (previous OpenClaw setup): `~/.agents/skills/jordan-job-digest/`, `~/.agents/skills/jordan-job-outreach-workflow/`
- Reference files (previous OpenClaw setup): `~/.openclaw/agent-reference/jordan/`
- Company blocklist: `~/.openclaw/data/jordan-company-blocklist.md`
- Voice corrections log: `~/.openclaw/data/jordan-voice-corrections.md`

## Note on Paige's setup

Paige's credentials are deliberately **not** in this repo. Her setup is entirely separate (different inbox, different AgentMail org) and the separation rule in [../agents.md](../agents.md) forbids mixing the two. If you need her credentials, they belong in her own project, not here.

