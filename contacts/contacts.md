---
name: jordan-contact-recon
description: Part 2, step 2 — determine company size and target team, then find the hiring contact via Exa (primary) or Apollo browser (fallback). Auto-picks the top result, no candidate gate.
---

# Contacts — Company Sizing, Team, Recon

Part of the outreach workflow (Part 2). Previous step: [../digest/refinement/refinement.md](../digest/refinement/refinement.md). Overview: [steps.md](../steps.md) § Part 2. Next step: [../assembly/templates/outreach.md](../assembly/templates/outreach.md).

---

## APOLLO ACCESS RULE
**NEVER use the Apollo API. ONLY access Apollo through the browser.**
- Navigate to https://app.apollo.io/#/people in the browser
- Make sure the browser is running first (`openclaw browser start` if needed)
- Apollo stays logged in on the openclaw profile (shared session — no separate Apollo key for Jordan; see [../tools/TOOLSAPIKEYS.md](../tools/TOOLSAPIKEYS.md))
- Do NOT make any HTTP requests to the Apollo API directly
- Do NOT use any Apollo API keys or endpoints
- All Apollo interaction is browser-only, every single time, without exception

**Apollo CAPTCHA:** If Apollo presents a CAPTCHA or "verify you are human" screen, stop and notify Jordan immediately. Do not attempt to bypass it. Jordan will need to open the browser and complete the CAPTCHA manually before the workflow can continue.

## EXA PRIMARY / APOLLO FALLBACK RULE
**Use Exa first for contact discovery (see Recon and Auto-Pick Contact, below).** Exa returns work emails directly, costs ~$0.50, and doesn't require browser interaction or credits.

When Exa succeeds:
- Auto-select the top-ranked result as the contact
- Skip Apollo entirely
- Proceed directly to assembly

When Exa returns no usable results, **automatically fall back to Apollo browser**. Do not ask permission — just run it. Auto-pick the top ranked result and spend the credit.

Exa cost is approximately $0.50 per run. Include in the RUN COST block as `Exa agent: ~$0.50`.

## LINKEDIN RULE — ABSOLUTE
**NEVER navigate to linkedin.com in the browser. NEVER log into LinkedIn. Ever.**
LinkedIn's bot detection will permanently lock the account — this already happened once on the shared setup.
- LinkedIn recon = **web_search only**, using `site:linkedin.com/in "[Company]" AND ...` query strings
- Do NOT open linkedin.com in a browser tab
- Do NOT enter LinkedIn credentials anywhere

## SEARCH ENGINE NOTE
web_search may use DuckDuckGo, which sometimes blocks or returns no results. If a search returns empty or an error:
1. Rephrase the query (broader terms, fewer constraints)
2. Try a different web_search query rather than retrying the same one
3. If still blocked, note "limited search results" and move on

---

### STEP 1 — DETERMINE COMPANY SIZE
Use Apollo company data, LinkedIn, Crunchbase, or the company site (most reliable available). Size routing for an engineering hiring target:
- **Under 200:** VP Engineering or CTO
- **200–1,000:** Director of Engineering or the team's Engineering Manager
- **1,000–2,000:** Director / Senior Director of Engineering or the hiring EM
- **Over 2,000:** Senior Director, the hiring Engineering Manager, or the team's eng leader

Default target: the Engineering Manager / Director who owns the role's specific team. VP/CTO is an optional "go high" play below ~1,000, not the default.

---

### STEP 2 — IDENTIFY TEAM / BUSINESS UNIT
Determine the team the role sits on from the JD before searching (e.g. Web Platform, Payments, Mobile, Core, Growth). Don't search generic engineering leadership — find the leader of the specific team.

---

### STEP 3 — RECON AND AUTO-PICK CONTACT

Run all recon, pick the best contact automatically, and proceed. Do not stop to ask Jordan.

**5a. Run Exa first (primary contact search):**
Use the Exa MCP agent (`mcp__exa__agent_create_run`) to find up to 3 engineering contacts at the company. Use `effort: "high"` and request full names, titles, and work email addresses. Query format:

> "Find up to 3 engineering managers or directors at [Company] (website: [domain]). I need their full names, titles, and work email addresses. Target the [Team] team if possible."

Request structured output with fields: `name`, `title`, `email`, `email_confidence`, `source`.

Wait for completion with `mcp__exa__agent_wait_for_run` (poll up to 50s per call until status is `completed`), then retrieve with `mcp__exa__agent_get_run_output`.

**When Exa succeeds:** auto-select the top-ranked result as the contact. Skip Apollo entirely. Proceed to assembly.

**When Exa returns no usable results — fall back to Apollo (browser):**
1. Navigate to https://app.apollo.io/#/people
2. Scope with `qOrganizationName=[Company]` plus `personTitles[]=` values across engineering leadership (engineering manager, senior engineering manager, director of engineering, senior director of engineering, vp engineering, head of engineering, cto).
3. Read the masked list. Pick the top result by title closest to the target level for this company size.
4. Spend one Apollo credit to unmask the contact's email.

**Out-of-credits:** If the credit spend fails because Apollo credits are exhausted, send a standalone email to Jordan (`jordanshryock@gmail.com` from `jordainshryock@agentmail.to`) with subject `Apollo credits — out of tokens`. Include: which contact(s) are pending (name, title, company), that he'll need to refill before the email can be pulled, and the unverified backup email formats so he has something to work with.

**5b. LinkedIn public confirm (web_search only — NOT browser):**
Run a `site:linkedin.com/in` web_search to confirm the selected contact's team ownership. Capture the LinkedIn profile URL if found. Do NOT navigate to linkedin.com in the browser.

```
site:linkedin.com/in "[Company Name]" AND "engineering" AND ("[Title]") AND ("[Team]")
```

**If both Exa AND Apollo fail to return any contacts:** Reply in the digest thread with a short note that contact search came up empty for that company. One or two sentences, no technical detail. Continue assembling any other roles in the batch.

---

### STEP 4 — CONTACT RECORD
After auto-picking and unmasking (if Apollo path), capture:
- Full name
- Title
- Company + location
- LinkedIn URL (if found)
- Verified email (or unverified backup formats)

Never invent contact info. Never present unverified email as verified.

---

Next: [../assembly/templates/outreach.md](../assembly/templates/outreach.md) — assemble the full letter and send the final package.
