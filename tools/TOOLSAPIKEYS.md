# TOOLS — Local Setup Notes

Environment-specific setup for this project: which service is used for what, which account, and **which environment variable holds each credential**.

**No secret values live in this file.** If you are an agent and need a credential, read
it from the environment variable named below — never expect to find it written down here.

## Where credentials actually come from

The routine runs in the **`job-digest` cloud environment**, configured at claude.ai/code
(environment selector → gear icon). That environment supplies:

- **Environment variables** — `AGENTMAIL_API_KEY`. Note these are readable by anyone
  using the environment; that is acceptable here because it is a single-user personal
  environment, and the key is rotatable.
- **Network access: Custom**, allowing `www.builtincolorado.com`, `builtincolorado.com`,
  and `api.agentmail.to`, with the default package-manager list also enabled so
  `npm install` works. **A host not on that list fails with `403 Host not in
  allowlist`** — an error that comes from the agent proxy and looks like a provider
  outage, so check the allowlist first.

There is **no Anthropic API key**. Claude Code is the agent; there are no self-managed
model calls to authenticate.

A local `.env` is only for running the tooling by hand outside a routine.

**Connectors must be removed from the routine.** All connected MCP connectors are
included by default, and a routine can call any of their tools without a permission
prompt. This routine needs none — everything it does is code in `digest_agent`.

---

## AgentMail

The inbox the digest reads from and delivers to.

- **Inbox:** `jordainshryock@agentmail.to`
  ("jordain" = Jordan + AI, intentional wordplay, not a typo. Same spelling is used for the Apollo login. Verified to exist.)
- **Digest recipient:** `jordanshryock@gmail.com` — the only address this inbox may send to, besides itself.
- **API key:** `$AGENTMAIL_API_KEY`, set in the `job-digest` cloud environment.
- **Accessed through code, never the MCP connector.** AgentMail's hosted MCP server
  exposes `send_message`, `reply_to_message`, and `forward_message` with no read-only
  mode. An unattended routine that reads untrusted job postings must not hold an
  unrestricted send tool, so `digest_agent/src/agentmail/client.js` wraps the REST API
  and enforces the recipient allowlist in code. See [../README.md](../README.md).

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

Everything the agent reads now lives in this repo. The OpenClaw paths these replaced
(`~/.openclaw/...`, `~/.agents/skills/...`) no longer exist on any machine.

- Company blocklist: [../data/company-blocklist.json](../data/company-blocklist.json)
- Voice corrections log: [../data/voice-corrections.md](../data/voice-corrections.md)
- Reference files: [../shared/](../shared/)
- Agent code: the `digest_agent` repo, cloned alongside this one by the routine

## Note on Paige's setup

Paige's credentials are deliberately **not** in this repo. Her setup is entirely separate (different inbox, different AgentMail org) and the separation rule in [../agents.md](../agents.md) forbids mixing the two. If you need her credentials, they belong in her own project, not here.

