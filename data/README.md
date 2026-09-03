# Data

Mutable state both agent processes read and write. Everything else in this repo is
reference material that only changes when Jordan changes it; this directory is the
exception, and the agent commits to it.

Entry point: [../agents.md](../agents.md). File map: [../files.md](../files.md).

---

## company-blocklist.json

Companies applied to recently enough that another application would be premature.
Replaces `~/.openclaw/data/jordan-company-blocklist.md`, whose path no longer exists.

**Read by** Part 1, in the hard filters ([../digest/initial/parsing.md](../digest/initial/parsing.md) § Step 3).
**Written by** Part 2, from blocklist commands in Jordan's replies ([../digest/refinement/refinement.md](../digest/refinement/refinement.md)).

```json
[
  {
    "company": "Acme",
    "appliedOn": "2026-09-02",
    "note": "applied, Senior SWE"
  }
]
```

| Field | Required | Meaning |
|---|---|---|
| `company` | yes | Company name as it appears on the posting. Matched case-insensitively. |
| `appliedOn` | yes | `YYYY-MM-DD`. The date Jordan applied — **not** the date the block expires. |
| `note` | no | Why it's listed: applied, rejected, not interested. |

### The window is 21 days, and it lives in code

An entry blocks that company for **21 days** from `appliedOn`. After that it passes the
filter again, because a new role may have opened.

`appliedOn` deliberately records the application date rather than a precomputed expiry.
The window is a rule applied when the file is read, so changing it later retroactively
does the right thing for every existing entry. Storing an expiry instead would bake
today's policy into old rows and require rewriting the file to change the rule.

### Notes for whoever maintains this

- A company already listed gets its date **refreshed**, not a second entry, so the
  window always runs from the most recent application.
- A missing or unreadable file is a **hard error**, not an empty list. Filtering against
  nothing silently readmits every recently-applied company, with no visible symptom in
  the digest.
- Entries are sorted newest first on write.
