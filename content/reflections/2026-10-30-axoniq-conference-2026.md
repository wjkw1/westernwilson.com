---
title: "Axoniq Conference 2026"
date: 2026-10-30
slug: "axoniq-conference-2026"
tags: ["conference", "ai", "devops"]
---

**TL;DR:** I went to [Axoniq Conference 2026](https://www.axoniq.io/), and the theme of the day was that AI-driven software delivery is about building software faster _and_ mitigating the risk that comes with it.

Mathias Verraes set the tone in the morning with his "97/3 no-regrets bet": whatever probability you give AI failing, spend that share of your effort on code quality, so humans can take over again if it does. Einar Ingebrigtsen came at it from a different angle in the afternoon, saying review is now the bottleneck and it's leading to PR fatigue. Both point at the same thing, AI shouldn't be the only thing verifying its own output. ASSIST had the best slides of the day, and Allard's airport parable in the closing keynote was a memorable story.

From the AI talks, conversations and my own thinking, four things stood out to me as worth additional investment in general:

- **Security analysis**, both static and dynamic, ideally with some supply-chain risk mitigation built in. [Aikido](https://www.aikido.dev/) is a great contender for a suite of security tooling.
- **Version and dependency tracking**, ensuring you understand the risk of what's falling out of date before it hurts you.
- **Agentic identity**, i.e. showing who manages each agent and deliberately limiting its scope, like a read-only path for your issue tracker and repos, and a separate, tighter write path for the repos. This needs some clever sandboxing that I haven't figured out yet.
- **Proxying LLM access to strip PII** before anything leaves. One team I spoke to already does this, and I think it's a really good idea.

On the Axon side, I'm keeping an eye on:

- **Axoniq Insights**: makes your events queryable with AI-assisted querying and MCP access.
- **Axoniq Clarity** (announced at the end of the day): aims to give brownfield projects most of the insight an event-sourced system gives you, ideally showing a pathway to event-driven architecture.
- **Deployment**: the industry lacks a good deployment model for Axon, especially for newcomers, so Axoniq are learning to build a Kubernetes operator and might build a community around it.
- **Axon Server**: backup & restore and disaster recovery work is coming.

After chatting with Mathias and I heard about DDD Europe in Amsterdam in June 2027. Reach out if you're going too!

The rest of this post is my notes from each talk, tidied up a bit.

## Welcome to Axoniq Conference 2026

**9:30am, Allard Buijze (Founder & CTO, Axoniq)**

- Axoniq's CEO Jessica sent a video thanking everyone for being there and trusting Axoniq with their journey.
- Allard stressed the importance of **trust**.

## Reasoning While We Still Can

**9:45am, Mathias Verraes (Founder, Aardling; co-author of _Design and Reality_; founder of DDD Europe)**

- The core theme is **risk**, illustrated by the broken clock analogy: you can't set a broken clock right unless you already know the correct time. This comes back later.
- The "dark factory" is the next stage of AI automation.
- There's a spectrum of how much code we read: all, some, or none.
- Managing risk comes down to harness, accountability and testing. The missing element is **rate of change**, so what should we do about it?
- Possible futures for AI: AI destroys us, a post-scarcity society, gradual growth to a plateau, or AI disappears (data centres cancelled, costs, government regulation, the financial bubble popping).
- **97/3 "no-regrets" bet:** whatever probability you give AI failing, spend that share of effort on code quality, in case AI goes away and we fall back to human engineering.
- The SDLC is all about managing risk. Agile managed risk better than waterfall.
- The old cycle was plan → analysis → design → implementation → testing → maintenance → back to plan. The new cycle is **spec → verify**.
- Agentic engineering currently splits work into roles. That artificial separation may not be needed anymore.
- **Own the rate of change:**
  - Control which artifacts agents can change, and when. Freedom within a boundary.
  - Specs are the single, human-readable source of truth.
  - Regenerate code from the spec. If behaviour changes, there's a problem. Clean up and prune specs, and diff them.
  - Mark an artifact as **stable** once it doesn't need changes anymore, which helps agents. e.g. a glossary or API contracts.
- Broken clock again: AI shouldn't be the only thing verifying itself. Back it up with static analysis, code-smell detection, CI/CD and testing.
- The final slide has 6 tips for AI design, worth a look.

Slides and a book discount code are at [verraes.net/axoniq](https://verraes.net/axoniq). Further reading he mentioned: Bainbridge, _Ironies of Automation_.

## Event Sourcing in Production: Five Things Nobody Warned Us

**10:45am, Frank Scheffler & Nikolai Neugebauer**

- Lessons from 7 years of running Axon-based systems in production. Their latest system passed 250M events in its first year.
- Team based in Germany, using embedded Axon.
- Side note: they generated the presentation as HTML because Claude reads HTML really well.
- Options for migrating projections:
  1. Fill nulls
  2. CRUD-style migration script
  3. Axon replay, with feature flags so old events run against new code
  4. Temporary backfill projector
  5. Versioned projections
- With versioned projections, the event store versions the projections, e.g. v1 without a `name` column and v2 with it. The trade-off is extra storage.
- Think about how large an event's payload could grow. It's often better to store a hash in the event and keep the data in a database table.
- They started with readable event data, but storing a hash made more sense in their experience. The command handler writes the data to a state-store table.
- Don't aggregate data on the event side, read it from persistent storage (Message Projector).
- Be conscious of downstream services when you replay.
- Keep command handlers (CQS) as fast as possible, and cache sourcing to stay fast.
- For long-running work, events act as triggers and tasks process the work. Ordered events can then be processed in parallel, which improves throughput. They call it the **Task outbox**, and someone in the audience called it the "todo list" pattern.
- Don't use generic events as a task workflow.
- Axon guarantees synchrony in event processing, but read differences between Postgres and Axon DCB are tricky. Solved for Postgres, not yet for DCB.

## The Architecture of Accountability

**11:45am, Maarten-Jan van Gool (Craftsmen) & Marc van Andel (Kadaster, Emerging Technology Center)**

- How event sourcing and DCB help a government account for, correct and prevent mistakes in its registers.
- Kadaster (the Dutch Land Registry) went through "timeline hell". A year ago they didn't know what to do, now they do.
- They told the story of a man who was wrongly declared dead and is still dealing with it. The population register underpins everything, so being "dead" locks you out of pensions and a lot more.
- Recording maps to projections in Axon 4, and DCB is the new Axon 5 context.
- **To tag or not to tag:** critics say tagging up front gives an event meaning before that meaning should exist, and events should just be events with meaning derived later. In government though, tagging makes sense because meaning is fixed at the moment of determination, e.g. a marriage registration.
- Determinations propagate downstream to other services, which makes them hard to undo. Doubt has to be registered as a new event or determination.
- The **Event Journal** tracks everything that happens, like an audit trail. The **Endorsed sequence** is only the current, correct "what is known".
- e.g. correcting an address: a new event corrects the original, and another event records what was withdrawn and what it should have been.
- Replaying projections isn't good enough. A database stores current state, not the history of what happened. Adding valid-date columns gives you temporality, but mistakes aren't always repeatable.
- **Bitemporality** adds a system time (`systemFrom`) alongside the actual valid-from date, and tracks both.
- Their solution is to sidestep the problem:
  - Don't communicate state, communicate events.
  - Make events repeatable, with state _superseded_, not replaced.
  - Old state events can then be replayed, so current state becomes whatever that old state was. Pretty cool.
  - Use **append-only state blobs**.
- This keeps the query side really simple compared to the complex joins a bitemporal relational database needs.

## From Discovery to Event Store: AI-Assisted Event Sourcing with the Axoniq Stack

**1:30pm, Steven van Beelen, Milan Savic, Mitchell Herrijgers & Marc Klefter (Axoniq)**

- The roadmap talk: Axon Framework 4 → 5, Axoniq Workflows, Axon Server, Axoniq Platform and Axoniq Insights.
- Lots of agentic resources available, plus a getting-started guide.
- Axoniq Platform has an event timeline view, a monitoring view, and a Kubernetes instance view.
- Axon Server setup can be automated through the Platform API, and the Axoniq CLI supports both Axon Server and Axoniq Platform.
- Axon Server now has full DCB support, with one-click migration of existing contexts to DCB, plus multi-tier storage for DCB.
- Learner nodes and topology reliability improvements.
- **Coming soon:** redesigned backup & restore, event transformation, and disaster recovery.
- They covered the differences between Axon Framework 4 and 5, and there are `axoniq-migration` skills to simplify the migration.
- **Axoniq Workflows** is Axon's solution for durable execution.
- **Axoniq Insights** runs alongside Axon Server (replacing an earlier feature) with AI-assisted querying:
  - Backed by DuckDB and DuckLake, so queries are apparently fast.
  - The Insights agent takes natural-language queries instead of raw SQL.
  - MCP support, exposing a single read-only events table.
  - It gets smarter the more you query, including workflows. Object storage for the event lake, and Snowflake came up in questions.
  - Their pitch: "the indispensable query layer for Axon Server."

Tools mentioned: [AxonIQ/agent-skills](https://github.com/AxonIQ/agent-skills).

## Not CRUD Anymore: Migrating to Event-Driven CQRS Without a Big Bang

**2:45pm, Ondřej Halata (Lead DevOps Engineer, ASSIST) & Richard Bouška (CTO, ASSIST)**

- A live, incremental migration of a business-critical brownfield app to CQRS, DDD and event sourcing on Axon, with no big-bang cutover.
- Best slides of the day! The slide titles and looping GIFs tell their whole CRUD → events journey: [assist-links.web.app](https://assist-links.web.app/).
- Scale: 1.5M events/day, 75+ instances, 150+ event processors, eventually split into contexts grouped by concept.
- Their journey:
  1. Everything in the frontend (Angular/TypeScript), going straight to SQL. This caused problems with queues and networking.
  2. BFF, "where the best friends are frontend and backend". Not bad architecture, it worked fine.
  3. Event architecture on SNS, "dragons everywhere". Slow network hops when services talked across clouds, and SNS tightly coupled infra and app deployments so rollbacks were painful.
  4. Axon, where **the event stream becomes the source of truth.**

## The Assembly Language for Information Systems

**3:45pm, Einar Ingebrigtsen (Cratis)**

- We keep stepping up abstraction levels. "Software engineering is dead."
- Timeline: COBOL (1959), CASE tools (1980s), 4GLs, Visual Basic and Dreamweaver (90s), offshoring (2000s), no-code (2010s), Copilot (2021, mostly autocomplete at first), ChatGPT and vibe coding (2025).
- He believes cheaper software means more software gets built, so _more_ engineers will be needed.
- AI optimises for speed. Velocity is speed with direction, and we should be optimising for velocity.
- We're still learning what AI is, but one thing is clear: **review is the bottleneck**, which leads to PR fatigue.
- He also called out plumbing, tokens and drift, each their own problem.
- Advice for the next generation: focus on systems engineering and what makes a good architecture rather than syntax, because AI is taking syntax off our hands.
- **Screenplay** is a condensed language describing how infra and code should be implemented, built on Event Modeling and following DDD ideas in how the language is defined.
- A PII flag automatically keeps an attribute encrypted.
- It generates code: Java for Axon, and .NET for Cratis.
- **Cratis** is their event backend, with MCP support. Pretty sweet.

## Closing Keynote: A New Perspective on Event Sourcing for the Other 95%

**4:45pm, Allard Buijze (Founder & CTO, Axoniq)**

- Instead of making event sourcing easier, make most of its benefits easier to get, including for existing systems without re-architecting them.
- Axon by the numbers: 90M+ downloads, ~2M per month, and 96 of the Fortune 100 use Axon.
- Put AI agents inside event-sourced systems so they're auditable by default, the same as everything else that's event-driven.
- **Airport parable:** CRUD engineers trying to find their way around event sourcing. Great story.
- "We've asked drivers to become mechanics."
- **"Ask Steven"**, a review agent trained on the nits a picky engineer would normally raise in reviews. Funny because then engineers would turn the agent back on the original engineer xD
- Event modeling is great for generating code.
- Use words the whole room understands, not technical concepts only the 5% (the techies) get.
- **Shu Ha Ri:** follow the rules → break the rules → define the rules.
- **"The Great Migration" parable** (wildebeest crossing the river), about brownfield projects.
- **Announcement: Axoniq Clarity.** Code scanning for brownfield projects, deployed as agents that watch and monitor your code. Similar to New Relic APM, but it stores what it observes as events: code, APIs, code execution, and database changes. It currently handles 20,000 events per second.

## Unconference

- Using an event model to generate diagrams, e.g. sequence diagrams. There was some talk of BPMN (the business process standard) vs using the event model itself.
- One CTO raised a bunch of interesting topics, mostly about Event Modeling, built around one question: "What's the most useful general abstraction to show clients?" He described creating an event model for a client, who then used it to build the application themselves with Claude.
- One consultant gives the client a proof-of-concept app with a built-in feedback interface. As the client uses it and gives feedback, agents update the app in real time along with the event model behind it. After two weeks or more, they have a solid event model and process flow to lock in for the proper build. A really cool idea, the app changes straight away in response to user feedback.
- One team proxies their LLM access to strip PII before anything leaves.
- Kubernetes: run one StatefulSet per node, not multiple, otherwise you hit problems.

Agentic tools that came up during the day: [Orca.dev](https://orca.dev), [Herdr.dev](https://herdr.dev), [Hermes](https://hermes-agent.nousresearch.com/), and [OpenCode](https://opencode.ai/).
