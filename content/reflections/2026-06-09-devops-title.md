---
title: "DevOps vs Platform vs Infrastructure Engineer"
date: 2026-06-09
slug: "devops-vs-platform-vs-infrastructure-engineer"
tags: ["devops", "career"]
---

I've been a DevOps & Infra Engineer for over 5 years. To me, it's about helping developers move from code to production in the fastest, safest, most secure, and most reliable way possible. The job market seems a bit less certain about this definition however...

Scrolling through job listings this past month, I noticed roles titled _DevOps Engineer_ or _Platform Engineer_ or _Infrastructure Engineer_ that were listed with almost identical responsibilities.

I know innately that these roles have some differences, but the titles are often used interchangeably by hiring teams.

## Where DevOps came from

DevOps is a word created from the combination of the words **Developer** and **Operations**. To understand why that portmanteau word became a job title, you need to understand the problem it was trying to solve.

Traditionally, software teams were split in two. Developers wrote code in one room, and an **Operations** team —sometimes called Ops— deployed and ran that code in production. Each group had different incentives e.g. devs wanted to ship fast whilst ops wanted stability. That tension caused friction, slow releases, and potentially a blame culture when things broke.

The DevOps movement, popularised in part by _The Phoenix Project_ (Kim, Behr, Spafford, 2013) and _The DevOps Handbook_, proposed a cultural fix to tear down that wall. If developers owned their code all the way to production, they'd build with operability in mind. They'd care about deployment pipelines, alerting, and recovery because those things would become their problem too.

DevOps is meant to be a shared practice of principles across teams, and not a single person's role. But organisations found it easier to spin up a DevOps teams or hire someone with the DevOps title who embodied that DevOps mindset to show some adoption of "DevOps" when it was first cool.

## What a DevOps Engineer actually does

In practice, the **DevOps Engineer** tends to be embedded within a product team, sometimes as the only person with that focus. Their job is improving the speed and safety of getting code from a developer's machine into production.

That means CI/CD pipelines (think GitHub Actions, TeamCity, CircleCI, or similar), automated testing, deployment automation, monitoring and alerting, and security gates. If a developer is waiting too long for a build, or a deployment is a manual, error-prone process, the DevOps Engineer is the one called on.

My own experience working in this role felt exactly like that: a solo DevOps expert embedded in a development team, focused on making the production path faster and more reliable. In smaller companies you will probably get the opportunity to pick up other development tasks outside of the usual job description. This helps you experience the pain that engineers go through to build better solutions.

## Platform Engineering

Platform Engineering has similar tools and similar outcomes, but from what I've seen, the scope and audience are different.

Where a DevOps Engineer typically serves one team, a **Platform Engineer** serves many. This role, I think, is oriented around building an Internal Developer Platform (IDP). An IDP is a curated set of tools, templates, and standards that every engineering team in an organisation can use. The CNCF communities often describe this as building **golden paths**: opinionated, well-maintained routes that make the right thing the easy thing for developers to do.

Think of it as the difference between solving a problem for your team versus building the infrastructure so any team can solve that problem themselves. Platform teams treat internal developers as their customers. They build self-service tooling —things like standardised deployment workflows, observability stacks, or secrets management patterns— so that product teams don't have to reinvent those wheels independently.

This tends to appear at larger organisations, where inconsistency across teams becomes a bigger cost. At a company with ten engineers, one strong DevOps person can handle everything informally. At a company with five hundred, the absence of shared standards can create chaos.

The tradeoff here is somehow creating efficient standards to keep things stable, but also giving optionality to engineers so they have autonomy over the tooling they choose.

A good tool to know about is Spotify's open source Backstage tool: <https://backstage.io/>

## Infrastructure Engineering

Infrastructure Engineering overlaps with both DevOps and Platform, but sits slightly further from application code in my experience.

An **Infrastructure Engineer** is typically focused on the foundations: cloud architecture, networking, access management, and the security controls that sit beneath the application layer. They're thinking about VPCs, subnets, firewall rules, load balancers, DNS, and how services communicate across boundaries. Often this involves deep expertise with IaC tools like Terraform and close familiarity with the cloud provider's lower-level primitives.

A DevOps Engineer might spend their day modifying a GitHub Actions workflow or adjusting a Dockerfile. An Infrastructure Engineer might spend theirs designing the network topology that those pipelines eventually deploy into.

That said, in my experience, in any organisation you have problems to solve and there is never a clean separation. So you're owning all of it, and carrying all three titles simultaneously whenever something is required.

## Why the roles overlap

There are more than the three role titles I've talked about too, e.g. Systems Engineer, Site Reliability Engineer, Integration Engineer, and many others that cover _similar_ responsibilities with decent overlap.

Part of it is because fashionable titles shift over time; DevOps was the go-to term but now it feels like Platform Engineering is. This is probably because it better captures the product-focused, team-of-teams thinking that scales for devops/platform teams.

Each organisation decides on responsibilities differently depending on team size, product maturity, culture in the industry, and even the background of whoever's hiring. So the title they're given is essentially a best guess based on responsibilities required at the start of the role, which often morphs into different roles as projects progress.

A startup with five engineers often doesn't have the headcount for specialisation. The person managing Terraform, building the deployment pipeline, and configuring the VPC is doing DevOps, platform, and infrastructure work all at once.

At larger companies, the separation becomes more meaningful. A Platform team with a product mindset and a roadmap looks very different from a DevOps Engineer embedded in a squad, even if both are deep into Kubernetes on any given Tuesday.

## Read the job description

After reading many applications, the practical lesson is to read past the title and into the responsibilities. A "Platform Engineer" role at a thirty-person startup will look nothing like the same title at an enterprise company. A "DevOps Engineer" role at a bank might be closer to what a Platform team does at a tech company.

The questions worth asking in an interview: Are you embedded in a product team or sitting in a centralised infrastructure group? Are you building tooling _for_ developers, or helping productionise a single product app? What does ownership look like when something breaks at 3am?

I like that DevOps Engineering is broad; I like having the option to do whatever is required to get the job done.
