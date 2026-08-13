# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## AgentMail

- API Key: `am_us_b6dbffc5bf47ff75b1cfdceadcceb74b3ba27c444700638c1058d5a5a4fdac15`

## Apollo

- API Key: `aG2oE5x2poAtIvj0w3O5qA`
- Base URL: `https://api.apollo.io/v1`
- Status: ✅ Authenticating | ⚠️ Limited contact coverage for large tech companies (Meta/Instagram returned 0 results)
- Inbox: `samanthai@agentmail.to`

## Jordan Shryock (separate setup — do not mix with Paige)

- AgentMail API Key: `am_us_74b43501faeb3d48ef33e1faea690d1e3555c39bd38c257a05f7599260e1f2f7`
- Inbox: `jordainshryock@agentmail.to` ("jordain" = Jordan + AI, intentional wordplay, not a typo — same spelling used for the Apollo login) — verified to exist, separate AgentMail org from Paige's
- Digest recipient: `jordanshryock@gmail.com` (only address this inbox may send to, besides itself)
- Apollo login (browser): username `jordainshryock@gmail.com` / password `finley=Doodle18`. (Note: username uses the "jordain" spelling, same as the AgentMail inbox, NOT his jordanshryock@gmail.com digest address — confirm if recon login fails.) Recon uses the Apollo browser session on the openclaw profile; log in with these creds if the session is logged out. No separate Apollo API key — the key Jordan labeled "Apollo" was actually his AgentMail key (above).
- Skills: `~/.agents/skills/jordan-job-digest/`, `~/.agents/skills/jordan-job-outreach-workflow/`
- Reference: `~/.openclaw/agent-reference/jordan/` (jordan-resume.md, jordan-cover-letter-system.md)
