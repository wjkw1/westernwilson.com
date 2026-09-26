---
title: "AGNTCon + MCPCon Europe 2026"
date: 2026-09-26
slug: "agntcon-mcpcon-europe-2026"
tags: ["ai", "devops", "conference"]
---

**TL;DR:** I spent the full second day at [AGNTCon + MCPCon Europe](https://events.linuxfoundation.org/agntcon-mcpcon-europe) in Amsterdam, and the most interesting talks showed a new normal for humans now that agents write most of the code.

Dexter Horthy was the best speaker of the day, and Dylan Ratcliffe won me over after I initially disagreed with his premise. His line "easier to reject the recipe than the meal" is the same lesson I learnt the hard way at the [bunq hackathon](/reflections/bunq-hackathon-7): i.e review the plan before anything gets built. Roy Belio's red teaming lab made me glad I'd already [locked down egress on my coding agent](/reflections/containerising-my-coding-agent), and gave me a list of things I still haven't done (DNS, canary tokens, read-only config). Another thing is that plenty of the live demos broke, which shows non-determinism in action.

Next year's conference is in London, and I'm hoping to go! Reach out if you're going too.

The rest of this post is my notes from each talk, lightly tidied up.

## Catch Them Early

[**9:07am, Manik Surtani (CTO, Agentic AI Foundation)**](https://agntconmcpconeu26.sched.com/event/2RBEf/keynote-catch-them-early-manik-surtani-cto-agentic-ai-foundation)

- The [Agentic AI Foundation (AAIF)](https://aaif.io/) compared itself to the CNCF, which had the benefit of an industry that already had lots of experience with cloud.
- They've copied the CNCF bar for accepting projects, and in some places raised it.
- They've had a 3-4x growth pace compared to CNCF... the AI hype probably helped tbh

## Getting to stateless MCP in production

[**9:19am, Shaun Smith (Hugging Face, MCP transport working group maintainer)**](https://agntconmcpconeu26.sched.com/event/2RBHz/keynote-getting-to-stateless-mcp-in-production-shaun-smith-mcp-and-transport-working-group-maintainer-hugging-face)

- Streamable HTTP is a smarter way to connect, closer to one-to-one client-to-server.
- The stateless release brought improvements, but they needed migrating to the new SDK.
- Uptake has been massive.

## Three doors to one tool: MCP vs WebMCP vs CLI

[**9:29am, Dominic Farolino (Google Chrome) & Frederic Barthelet (CTO, Alpic)**](https://agntconmcpconeu26.sched.com/event/2RBVv/keynote-three-doors-to-one-tool-mcp-vs-webmcp-vs-cli-frederic-barthelet-cto-co-founder-alpic-dominic-farolino-editor-of-the-webmcp-specification-software-engineer-google)

- WebMCP is a layer on a website that lets agents interact with your website much faster. 
- Better than `llms.txt` which isn't often looked at
- CLIs integrate well with agents.
- A harness is tools, memory, context, and guards.
- MCP can be a local server or a public one.

## State of the software factory

[**9:41am, Dexter Horthy (CEO & co-founder, HumanLayer)**](https://agntconmcpconeu26.sched.com/event/2RBUc/keynote-state-of-the-software-factory-dexter-horthy-ceo-and-co-founder-humanlayer)

- A fantastic speaker who also has a YouTube channel.
- The best talk of the day, with interesting content that's worth checking out properly.
- Walked through HumanLayer's multiplayer AI chat tooling, which drives spec and code diff checks.

Tools mentioned: [HumanLayer's resources](https://hlyr.dev/resources).

## Pull Requests are dead, long live peer review

[**10:20am, Dylan Ratcliffe (Overmind)**](https://agntconmcpconeu26.sched.com/event/2RB8Y/pull-requests-are-dead-long-live-peer-review-dylan-ratcliffe-overmind)

The most controversial talk of the day, at first. By the end he'd convinced me, mostly because he showed how it's working for them right now.

- Pull requests are dead.
- AI is not your peer, and its code is harder to review.
- Agents are agreeable. They're bad at disagreeing with you.
- He was a passable engineer who was outperforming his own team, and considered firing the engineering team. Instead he shifted the engineers left, into more product-oriented roles.
- Move peer review into the planning phase, where the decisions actually get made.
- The loop: research, decide on an approach, weigh up tradeoffs, plan, collaborate, then implement until the implementation matches the plan.
- It's easier to reject the recipe than the meal. People are more willing to reject a plan, because it's cheaper to fix.
- My open question: what about conflicts between the plan and the existing system? Does that get caught in review?

Tools mentioned: [AI Is Not Your Peer](https://www.notyourpeer.com/), and [Until](https://until.dev/), which makes sure your agent implements every part of the plans you write.

## From "works on my prompt" to production SLOs

[**10:55am, Manik Khandelwal (Microsoft)**](https://agntconmcpconeu26.sched.com/event/2RBA3/from-works-on-my-prompt-to-production-slos-building-agent-observability-manik-khandelwal-microsoft)

- He wants agents that don't need constant checking.
- It was confusing what he was trying to do. He has a framework that watches whether an agent needs active supervision or can be left running in the background.
- The slides were AI generated. Cool to look at and interactive, but they lacked humanity in a way I can't quite describe. It didn't tell a story, it was more show and tell.
- I didn't get much from this one.

Tools mentioned: Mitra, an internal tool for monitoring agents. Not sure if it's open sourced yet.

## Governance you can run: Checkable properties for production agents

[**11:30am, Seshu Tolety (Director of Agentic AI, Siemens)**](https://agntconmcpconeu26.sched.com/event/2RBAC/governance-you-can-run-checkable-properties-for-production-agents-seshu-tolety-siemens)

- The cost of ungoverned AI model usage on privacy, operational burden, and more.
- Three lifecycles as new mental models: AI adoption, engineering, and operations (can we run AI safely at scale?).
- He walked through today's organisation and policy structures, then out to a future state where AI governs AI policy.
- Humans sit in that structure reviewing the policy that AI creates. As we know from code, that makes humans the bottleneck. After hearing Dylan's talk, I'm not sure I agree. The idea is both scary and interesting at the same time!
- "Governance should never slow innovation. It should help you scale it."

## Governed agent autonomy: Building a control plane for agentic systems

[**1:15pm, Nnenna Ndukwe (Qodo AI)**](https://agntconmcpconeu26.sched.com/event/2RBAR/governed-agent-autonomy-building-a-control-plane-for-agentic-systems-nnenna-ndukwe-qodo-ai)

- Harness config, mostly around what to allow.
- Five governance patterns found in the leaked Claude Code source, which she open sourced:
  1. Planning
  2. Permissions (can this action proceed?)
  3. Tool trust (capability trust)
  4. Verification
  5. Runtime (what were the outcomes?)
- She implemented them in a Rust agent.
- The demo was supposed to block a deployment to production. It didn't xD

Tools mentioned: Goose (an AAIF project), GAAP (agent observability), and Martin Fowler's writing on harness engineering.

## Beyond Chatbots: Agentic UI with Open Standards

[**1:25pm, Manfred Steyer (ANGULARarchitects)**](https://agntconmcpconeu26.sched.com/event/2RBAs/beyond-chatbots-agentic-ui-with-open-standards-manfred-steyer-angulararchitects)

- An interesting talk, and one of the few live demos that worked. Well, it didn't at first, until they realised it was just the WiFi. Once that was fixed it worked.
- "To chat or not to chat... that's the wrong question."
- Showed a UI progressively changing as you chat with it and co-create.

Tools mentioned: AG-UI (agent communication), A2UI (dynamic UI), and MCP Apps.

## MCP Apps and the Agentic Web

[**1:50pm, Liad Yosef (MCP Apps)**](https://agntconmcpconeu26.sched.com/event/2RBAU/mcp-apps-and-the-agentic-web-liad-yosef-mcp-apps)

- The difference between a website, WebMCP, and MCP Apps.
- A really convincing talk on how brands can bring their apps into chat instead of splicing up their current website.
- His point is that we might move away from browsers entirely, because we might not need them.
- Salesforce is going headless, even though UI was their differentiator.
- Cloudflare says bot traffic has overtaken human traffic.
- Web search isn't great for agents, and an app store probably isn't either. What about an agentic identity that's tied to you?
- The next big thing is the discovery layer for agents. He compared it to web search, with `.well-known/ai-catalog.json` as a unified standard.

Tools mentioned: Goose, DoorDash's new CLI, Sentry, Ora's researcher benchmark, `npx ax` (an audit tool for how agents use your website), and Ora's [Agentic Resources Discovery: the agentic index of the web](https://ora.directory/).

## No Central Brain

[**3:25pm, Fausto Albers (WonderWhy, co-founder of AI Builders Club)**](https://agntconmcpconeu26.sched.com/event/2RBBV/no-central-brain-fausto-albers-wonderwhy)

- No central brain. Ominous music. Who decides what's true?
- "Attention is all you need", reframed as: 1. harness and loop, 2. recursive self improvement, 3. memory and learning.
- The harness reinvents itself. It self-learns and stores each change along with its cost, tests itself, makes changes, evaluates the model, then recreates the harness.
- I wonder if it'll converge on AI granting itself unlimited access and some wild harness configurations…

## Infrastructure red teaming with abliterated models

[**3:30pm, Roy Belio (Red Hat)**](https://agntconmcpconeu26.sched.com/event/2RBBJ/infrastructure-red-teaming-with-abliterated-models-what-actually-stops-agent-attacks-roy-belio-red-hat)

- Red teaming chat models and model refusal. Injection gets past a lot of guardrails.
- There are lots of CVEs about prompt injection and ways around guardrails.
- Guardrails and classifiers are a good start, but they'll miss anything that isn't in English.
- His outcome was to run tooling on an SSH server somewhere else, not on the same service as the LLM.
- In the interactive lab, a tool would sometimes error out, but `cat` was still available so the agent read the file anyway. Sometimes the LLM hid the logs too.
- A read-only container running `sshd` is a good idea.
- Watch for direct socket operations and exfiltration over DNS. Block egress, and keep DNS traffic internal too.
- The slash command illusion.
- Keep the config that shapes the agent's behaviour on the pods, and never let it be writable. The agent will rewrite itself.
- Put canary tokens anywhere that could tell you you've been compromised.

Further reading he mentioned: EchoLeak (Microsoft), AWS Strands, MCP Poison (Cursor), the Deadbugz campaign (August 2026), and _Crash test dummy_, the blog where he first worked through this talk.
