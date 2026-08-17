---
name: jordan-outreach-assembly
description: Part 2, final step — interpolate the approved intro and contact record into Jordan's canonical letter template, then send the finished package back to him. No AI call: template interpolation only, so the tuned intro never gets reworded.
---

# Assembly — Final Letter + Package

Part of the outreach workflow (Part 2). Previous step: [../../contacts/contacts.md](../../contacts/contacts.md). Overview: [steps.md](../../steps.md) § Part 2.

**New-architecture note:** assembly is template interpolation, not an AI call — otherwise the model quietly rewords the intro Jordan just tuned. The template below (canonical letter, paragraphs 2–3 fixed, paragraph 1 built from the approved hook) is the interpolation target.

---

### STEP 1 — ASSEMBLE THE FULL EMAIL
Use Jordan's canonical letter. Only paragraph 1's hook changes; paragraphs 2 and 3 are fixed:

```
Hi [Manager first name],

I'm reaching out to express my interest in the [ROLE] at [COMPANY]. I care about designing and building products that benefit the customer while driving real revenue. Over the past several years as an engineer I've owned the entire development cycle from business relationships to architecture design to implementation to deployment and maintenance. [approved company hook]

I'm an engineer who builds with the user in mind. As one of the architecture leads on a greenfield app at Osaic, replacing the main customer platform for nearly 1 million users, I've designed the system to be clean, intuitive, and scalable. I excel as a thought partner to the business. Consistently throughout my career, I've built trust cross functionally to translate business strategy into real products. As an engineer I'm forward thinking and have been driving efficient AI adoption at my company. Setting up the agent tooling and skills so the AI is grounded in our architecture and conventions from day one. Outside of work, I run autonomous agents for multi-step tasks and use Claude Code to turn my own designs into working personal projects.

Are you available for a 15-minute conversation to discuss the value I could bring to your team? I'm confident I can offer you both diverse and relevant experience and I would appreciate being considered now or in the future for any engineering roles. Additionally, if you know of any opportunities or someone who's looking please let me know.

Best, Jordan Shryock
```

This is the same canonical letter as [../../shared/jordan-cover-letter-system.md](../../shared/jordan-cover-letter-system.md) — that file is the source of truth if the two ever drift.

After assembly, the Update Company Blocklist step in [../../digest/refinement/refinement.md](../../digest/refinement/refinement.md) appends the company to the blocklist.

---

### STEP 2 — SEND FINAL PACKAGE TO JORDAN (thread reply)

Reply in the digest thread **to Jordan** (`jordanshryock@gmail.com`). This is a ready-to-send package — Jordan copies the letter and sends it himself to the hiring manager.

**DO NOT send to the hiring manager. DO NOT send to the contact's email address. The contact email is information for Jordan, not a send target for you.**

One email. No confirmation step. This is the final deliverable.

Format for each role (repeat per role Jordan approved):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━
[Company] — [Role]
━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact:
[Full name] | [Title]
[Company] — [location]
LinkedIn: [profile URL or "not found"]

Email: [verified email]   — or —   Unverified (backup formats):
  [firstname.lastname@domain]
  [flastname@domain]

Full letter:

---
Hi [first name],

[Complete 3-paragraph letter]
---
```

After all roles:

```
[If any blocklist additions were made:]
Blocklisted: [Company A], [Company B]

--- RUN COST ---
AI / model tokens:
  Haiku (contacts.md, this step): ~$[X.XX]  ([input] in / [output] out)
  Sonnet (refinement.md — cover letter rewrite): ~$[X.XX]  ([input] in / [output] out)
  Combined: ~$[X.XX]
Web searches: [count] (~$[X.XX])
Apollo credits: [N] (~$[X.XX])
Exa agent: [~$0.50 or $0.00]
Total: ~$[X.XX]
```

No "reply send to confirm." No further round-trips (in the old, single-pass version — see the note at the top of [../../digest/refinement/refinement.md](../../digest/refinement/refinement.md) about the new looping behavior). Jordan has everything he needs to send.
