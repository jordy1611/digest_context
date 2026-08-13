# Cover Letter System — Jordan Shryock

Single source of truth for direct outreach to engineering managers. If anything here conflicts with an older note, this file wins. Pair with the voice rules below and `jordan-resume.md` (the resume, which grounds every claim).

THE letter is short. It's a direct-outreach email: greeting, intro paragraph, a fixed credential paragraph, a fixed ask, sign-off. Paragraphs 2 and 3 almost never change. The only part rewritten per company is the intro paragraph, built from the fixed template opener plus a company-specific hook (see Intro Playbook).

**Name rule:** always sign and refer to himself as **Jordan Shryock** in applications and outreach. "Jordy" is a nickname and is never used when applying.

---

## How we work

- Direct outreach, not portals. A short note plus the resume, emailed to the manager.
- One tight version per pass, with 1-2 alternate phrasings inline only if useful. State the lean in a sentence. Skip the "want me to do X next" closer. He'll ask.
- Multi-option + rationale format is only for big structural decisions, not tactical passes.
- When he hands over a starter sketch, finish the thought, don't rewrite it. Fill the "because," sharpen a flat phrase, catch banned words and AI tells, suggest order swaps. Leave his plain in-voice sentences and his own framings alone even if a tighter line exists.

---

## Voice rules (hard constraints)

**Never:** em-dashes (not —, not --), semicolons, "leverage," "robust," "seamless," "holistic," AI filler vocabulary, "force multiplier," "bread and butter," "what I'm good at," openers like "I hope this email finds you well."

**Always:** contractions. Short declarative sentences mixed with longer comma-stacked ones. Understated confidence, not bragging. Run-ons and comma splices are fine. Don't sand it smooth.

**Distinctly his:** parenthetical asides, "Example:" as inline structure, short punchy closers, softeners ("kind of," "basically," "pretty," "really"), "definitely."

**Casing in cover letters and outreach:**

- "AI" capitalized (audience-matching for letters and managers). Overrides the old "lowercase ai" note, which now only applies to LinkedIn and casual writing.
- "api" stays lowercase in prose.
- "MCP" capitalized. Proper nouns as-is: Claude Code, Figma, Notion AI, OCP.

**Locally hosted LLM:** the template just says "a locally hosted LLM" and doesn't name the tool. Keep it that way.

---

## THE cover letter (canonical)

Only the bracketed hook in paragraph 1 changes. Everything else is fixed.

> Hi [Manager first name],
>
> I'm reaching out to express my interest in the [ROLE] at [COMPANY]. I care about designing and building products that benefit the customer while driving real revenue. Over the past several years as an engineer I've owned the entire development cycle from business relationships to architecture design to implementation to deployment and maintenance. [1 to 2 sentences specific to them, the company hook. See Intro Playbook.]
>
> I'm an engineer who builds with the user in mind. As one of the architecture leads on a greenfield app at Osaic, replacing the main customer platform for nearly 1 million users, I've designed the system to be clean, intuitive, and scalable. I excel as a thought partner to the business. Consistently throughout my career, I've built trust cross functionally to translate business strategy into real products. As an engineer I'm forward thinking and have been driving efficient AI adoption at my company. Setting up the agent tooling and skills so the AI is grounded in our architecture and conventions from day one. Outside of work, I run autonomous agents for multi-step tasks and use Claude Code to turn my own designs into working personal projects.
>
> Are you available for a 15-minute conversation to discuss the value I could bring to your team? I'm confident I can offer you both diverse and relevant experience and I would appreciate being considered now or in the future for any engineering roles. Additionally, if you know of any opportunities or someone who's looking please let me know.
>
> Best,
> Jordan Shryock

---

## Posting read guide (workflow step 1: read and extract the hook material)

Before screening for fit or writing, read the posting in this order to pull the hook material:

1. "What We Do" / mission language — richest source, the company's own voice.
2. "Why Work With Us" / culture and values — where they signal what's important.
3. Anything bolded — the company flagging their top priorities.
4. Qualifications and responsibilities — scan for repetition and unusual specificity. Repeated themes signal real priorities. Named tools live here too.
5. Role title and one-line summary — for framing the intro, nothing more.

**Ignore:** nav bars, similar job postings, office-location lists, testimonials, benefits boilerplate, footer, legal/EEO text.

**Token-saver:** ask him to paste (1) What We Do, (2) Why Work With Us, (3) anything bolded, (4) the qualifications list. Don't fetch the full page.

---

## Fit-trap screen (workflow step 2: does the role actually fit?)

Screen every posting for fit before writing any intro. A strong intro into a role he can't back is worse than no application. The letter writes a check the body can't cash, and the manager sees it.

**Good fit signals:** the actual day-to-day includes (a) frontend/UI work, (b) application architecture, (c) cross-functional product work, (d) end-to-end ownership, (e) feature development, or (f) AI tooling/adoption as a real responsibility, not just a culture tagline. At least one of these has to be a main job duty, not an added bonus.

**Bad fit tells — watch for these patterns:**

- **Backend-systems role wearing attractive culture.** SRE, billing/metering, distributed systems, data pipelines, Rust/Go/C++ backend roles where the job description is 100% infrastructure and the culture section says "we value learning and AI adoption." The culture hooks, the actual work doesn't. (Examples: Hebbia SRE, Deepgram billing — both killed for this.)
- **"Full-stack" but really backend-heavy.** Posting says full-stack but qualifications list emphasizes database optimization, system design, backend frameworks, distributed systems, and only mentions UI/frontend as "nice to have." The bulk of the work is data and service layers. (The day-to-day won't be the owner-of-the-whole-thing work he wants.)
- **Role evolution trap.** Posting flags "potential for growth into architecture/leadership," but the role itself is strictly individual contributor on a narrow slice (React components, feature implementation, backend services). Don't assume the growth materializes. Evaluate the role as it is, not as it might become. (Growth language can hide a boring current job.)
- **AI tooling is a customer feature, not a dev practice.** Posting talks about building LLM features, Retrieval Augmented Generation, prompt engineering, etc. That's a product skill, not an engineering-practice skill. He's not driving internal AI adoption; he's building a specific feature for a specific market. Different value prop entirely.
- **Very senior title, very junior scope.** "Principal Engineer" or "Staff Engineer" but the actual responsibilities are individual contributor-sized (build this feature, own this service). Either the company inflates titles or the role is genuinely a trap. Either way, it's usually not the ownership-and-architecture work he's chasing. 

**When you spot a trap:**

- Flag it up front. Name the specific reason (role substance, not just location). Suggest a better fit from the target list if one exists.
- Only write the intro if he explicitly asks and understands why it's weak.
- Don't use "where I excel" on a role he can't actually back. That phrase commits him to capability he doesn't have in that context.

**Always also check:**

- **Location reality:** US-based, remote ok? Denver hybrid okay.(No Poland-only roles, no visa sponsorship required if he's not open to that.)
- **Hard gates:** citizenship/clearance requirements, required relocation travel, other non-negotiables.

---

## Intro Playbook (workflow step 3: write the intro if the role passes fit)

The intro paragraph is the two fixed opener sentences ("I care about designing and building products..." and "Over the past several years...") followed by 1 to 2 company-specific sentences built from the posting material he read. PNC is the model for the current full form.

**Shape of the hook: them first, him second.**

- Their published value or a specific slice of the role, plus a "because"/pivot clause that lands on capability and value to them.
- (Optional) a short domain credential that strengthens the tie. Only add this if it's genuinely relevant (Example: the finance line for PNC). Otherwise the value + because is enough.

**Redundancy watch-out:** paragraph 2 already carries "driving AI adoption," the architecture lead role, and the component library. Don't repeat the "I'm currently driving AI adoption at Osaic, where I lead UI architecture..." credential sentence in the hook the way the older sent examples did. With the new opener, the hook stays leaner. (The older library examples below bundle that credential line because they predate the new opener. Use them for hook angle and phrasing, not as a length model.)

**The rules:**
- The "because" must convey value to them, not preference. "the work I care most about," "what I love doing" are inward-facing and get cut. "is eactly where I excel." and "is exactly the kind of work I do best" don't convey much meaning while also sounding artificually created. Pivot to A genuine ownership/end-to-end "because" is fine when it isn't reading as pure preference.
- Hook to proof, not hook to claim. Pick the angle Jordan has real evidence for, then let the credential prove the trait instead of asserting it. Show, don't tell.
- Names a tool he uses beats the generic AI hook. If the posting names Claude Code, Cursor, Copilot, Figma-to-MCP, etc., lead the hook on it. Exact match beats thematic. (Rula led on Claude Code.)
- Lift the stat into the hook. If a specific achievement (the 24+ component library) won't flow cleanly in a credential clause, lift the concept up into the hook as a capability claim.
- Don't get too specific to the role, especially when it's an industry Jordan doesn't have experience in. The more specific the hook, the harder it is to relate to Jordan's actual experience. Financial industry is okay to mention but that's it.
- Multiple uses "this" and "that" sound AI generated.
- Avoid redundant unecessary language "is exactly where I proved value" has unecessary descriptors, sounds artificial and low effoort
- Avoid getting in a loop of always using the exact same transitions and language.

---

## Intro hook library (sent examples)

### Negative examples
Also not most of these just contain the same hooks like "exactly where I excel".

**Overly specific hooks**

> Solovis's push to put AI at the core of how the team builds, while raising the bar on quality for institutional investors, is exactly where I provide real value. I work in the financial industry now and I've spent my career turning complex financial data into tools people can actually use. 
>> Note: It's just a detailed description about the company and slapping on "where I excel".

**Hooks only summarizing what the company does**
> Postscript's focus on giving ecommerce brands a direct line to their customers that actually drives revenue is exactly the kind of work I do best. I've spent my career taking a business goal and carrying it all the way through to a product people use. 
>> Note: The 1st sentence does not relate to technical experience at all. This is just describing what the company as a whole does and slapping "where I excel". It has nothing to do with my ability related to the job requirements. The 2nd sentence is okay.

> Carrum Health's model of connecting patients to the right care while cutting out the waste is exactly the kind of work I do best. I build products that stay simple for the people who use them, even when what sits behind them is complicated. 
>> Note: 1st sentence is just a description of what the company does and "I do best" slapped on the end. 2nd sentence is okay.

**Hooks with inaccurate experience**
> Baseten's work making the complexity of deploying AI models simple for the developers who use it is exactly where I excel. I build interfaces that stay clean on the surface while the systems underneath do something hard. 
>> Note: I don't have experience deploying AI models.

**Hooks that make no sense**
> Seeq's focus on engineers who own features across the whole stack, from the browser interface down to the data layer, is exactly where I excel. I take complicated systems and turn them into something clean and usable on the surface.
>> Note: This first sentence says nothing and makes no sense. It's just say hey some engineers do this thing and it's "exactly where I excel".


> Akamai's emphasis on leading innovation and pushing ground-breaking ideas forward resonates with me because owning the end to end development of new products and ideas is the part of this work I care most about.
>> Note: The first and 2nd halves don't match up here. Akamai's empahasis leading innovation doesn't directly correlate to end to end development. The transation doesn't make sense. "this work" doesn't make sense here since we don't know what work specifically.
 

### Postitive examples
Real sent hooks, one per situation type. Use for hook angle and phrasing. Remember these predate the new fixed opener, so they run a bit longer than the current form needs.

Be creative writing this. Stay within your guidlelines but don't treat every example as the literal way to write every intro.

**Value-hook, with domain credential (PNC, current full form):**
***Note: This should be used cautiously. Do not just describe what a company does if it doesn't relate to Jordan's skillset.

> PNC's emphasis on people being your greatest market advantage really resonates with me because the successful organizations I've been a part of were where the people were kind and sharp and the ownership was real. I currently work in the financial advising industry at Osaic and I have experience providing customers with intuitive financial tools while ensuring the security of their financial information.

**Developer-enablement / platform (Benchling):**

> Benchling's focus on building tooling and patterns that make other developers more effective is exactly where I excel, setting up the engineering standards and reusable component libraries our teams build against.
>> Note: this is good minus "exactly where I excel". There's better ways to convey the same meaning.

**Relating to a mission, morally correct (Vrituous)**

> Virtuous building elegant fundraising tools that help nonprofits actually connect with their donors is the kind of mission I want my work behind. I approach engineering as a product and cross functional partner who builds with AI from the start.

**User-empathy / user-focus (UL Solutions):**

> UL's focus on building software that empowers a focused user base and turns complex work into something usable is exactly where I excel, designing systems that are complicated underneath but simple on the surface.


---

## Resume facts for grounding (don't drift from these)

- **Osaic** (Oct 2023 to present). Senior Software Engineer, UI Architecture Lead on OCP. Greenfield cross-platform app (Flutter/Dart, Riverpod) replacing the primary customer platform for nearly 1 million users. Set application architecture, release pipelines, engineering standards adopted across teams. Component library used across 24+ applications, WCAG accessibility. Figma-to-MCP design-to-code integration. Drives AI adoption.
- **Accuris** (formerly S&P Global) (Oct 2021 to Oct 2023). Software Engineer. Rebuilt a legacy monolith ($400M in annual transactions, 500K+ customers; the Engineering Workbench piece generated ~$25M/yr) into scalable microservices on AWS with redesigned database architecture. Full-stack services end to end, from api design through deployment. Beneficial Owners nested trust forms (six-layer recursive tree). Document Compare npm package (Angular web components).
- **Summit Materials** (Jan 2021 to Oct 2021). Software Engineer. Increased transaction totals 5x and average transaction amount 2x in 7 months. Worked directly with customers and business stakeholders (pseudo-product).
- **Education:** Turing School of Software and Design. Bachelor's, Economics, Colorado State University. (Non-traditional path. Doesn't need defending in direct outreach to managers.)
- **Stack:** React, Angular, Flutter/Dart, TypeScript, CSS/SCSS, Riverpod, Redux, Figma, Storybook (frontend). C#, ASP.NET, Java, Spring Boot, Python, Django, SQL, Entity Framework, LINQ (backend). AWS, Docker, CI/CD, microservices, application architecture, accessibility.
