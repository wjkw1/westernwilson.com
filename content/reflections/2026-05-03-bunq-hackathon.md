---
title: "Deciding what to keep"
date: 2026-05-03
author: "Western Wilson"
slug: "bunq-hackathon-7"
tags: ["ai", "devops", "communication"]
---

It was around 4am when I scrapped the project. AI had co-built me a FastAPI cathedral, full of libraries I didn't recognise and an architecture more ambitious than a 24 hour hackathon could achieve.
The code worked, sort of. Extending it would be challenging, and integrating it with AWS would take time we didn't have. So I deleted everything and started again with something simple that we could build and demo quickly.

This moment has been circling in my mind across this last week.

## How I got there

I went to Amsterdam for three nights, partly to see the city, partly because my cousin worked at Bunq, and mostly to take part in their 24-hour hackathon. I arrived alone, with no plan and no team. Bunq grouped me with strangers. Two of them didn't show because, of course. So on the day we found two other people in similar situations and formed a new team.
The brief was to build something that solved a pain point, used the Bunq API, and some kind of multi-modal AI. I didn't know who I'd be working with or whether our ideas would gel. I didn't know what we'd build, and honestly that was exciting to me!

## Who I worked with

Our team was called "4 corners" and had people from four countries with ages ranging from late twenties to early fifties. We were all working professionals, but they had longer track records than I did, with business careers spanning multiple roles and industries, and MBAs to go with them. A Business Analyst, a Product Owner, and even a CFO. Honestly, it was a privilege to be around these smart, accomplished, mid-career people whose lives had taken different trajectories and led them to this moment.

## Relearning to listen

These were senior professionals, and most of them were operating in their second or third language. The ideas were big. The listening was good, but repeated conversations were required for the meaning to stick. I noticed moments where people were talking over the top of each other, each pushing their own concept without absorbing anyone else's. I watched it happen, then I watched myself become the person trying to slow it down. I spent a decent portion of time mediating conversation, helping people see what they were missing in the conversation. Diffusing some of the tension.

I was also part of the communication problem. English is my first language, but a New Zealand accent on no sleep is its own kind of barrier, and I mumble when I'm tired. Explaining application architecture to people thinking in business terms, in their second language, while I'm slurring my vowels, was harder than the build itself. I had to slow down, enunciate, and translate not just words but ideas. From tech to business, and from what the code was doing to what we were actually trying to build.

The disconnect between technical and non-technical thinking is wider than either side realises, and it only shows up when something forces it into the open. A 24-hour deadline did that pretty quick.
And for me, as someone who wants to work globally, this is a great problem to learn about. It's something I'm likely to encounter daily while working for European companies.

## The build

On the day we had a brilliant talk by someone from AWS about spec driven development. I took that talk to heart and tried building using that same ethos. This led me to a vibe-coded backend app in Python, the language I knew, but pointed at AWS, S3, the Builder ID we'd been given. Aiming for production-grade infrastructure for a 24-hour prototype was what I was going for (silly I know…). The AI, eager to please, happily built me something far beyond what the hackathon called for.

It reminds me of something an old colleague once told me:

> building something is easy, productionising it is the hard bit

In this hackathon, unfortunately, I started off by inverting their advice. I was productionising something before I'd built anything.

## The pivot

You can wrangle an app together in 24 hours. What matters more is whether you've thought clearly about the problem, can articulate the pain point, and can demonstrate something useful with honest tradeoffs. Mock the APIs instead of integrating with it (unless you have experience working with that particular AI). Stub the database or run one locally. Show the core idea working. Later, if there's time left, then connect the real infra.
That's what scrapping AI's FastAPI cathedral version got me back to. Something small, something I understood, something we could actually show someone. The lesson for me wasn't about FastAPI or AWS. It was showing the gap between ambition and execution. It was about prioritisation, focusing on the problem and on building something that demonstrates a useful solution.

The winning teams that night? Mostly localhost applications.

## Amsterdam

After the Hackathon winners were announced, I left Bunq HQ into a city I'd been told was lovely. My cousin recommended Amsterdam as the place to be, and I could see why. Flat landscape, bike-friendly, sunny skies that week (rare, apparently), with free ferries criss-crossing the harbour, and multilingual people moving through it all with quiet competence. It felt like a larger Wellington with better trains.

I came partly to see whether I could live in Amsterdam. I left knowing I could. The hackathon had asked the same question the city was asking, in a smaller frame and over 24 hours: could I walk into a room full of strangers, find what mattered, and start over when I needed to.
