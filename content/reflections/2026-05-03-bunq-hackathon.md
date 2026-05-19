---
title: "Deciding what to keep"
date: 2026-05-03
lastmod: 2026-05-19
author: "Western Wilson"
slug: "bunq-hackathon-7"
tags: ["ai", "devops", "hackathon"]
---

It was around 4am when I scrapped the project. AI had co-built me a FastAPI cathedral, full of libraries I didn't recognise and an architecture more ambitious than a 24 hour hackathon could achieve.
The code worked, sort of. Extending it would be challenging, and integrating it with AWS would take time we didn't have. So I deleted everything and started again with something simple that we could build and demo quickly.

This moment has been circling in my mind across this last week.

## How I got there

I went to Amsterdam for three nights to see the city and to take part in Bunq's 24-hour hackathon. I arrived alone and Bunq connected me with a team. On the day two people didn't show so we ended up finding two others in similar situations and formed a new team.

The hackathon brief was to build something that solved a problem, used the Bunq API, and had some kind of multi-modal AI. I didn't know what we'd build, and honestly that was exciting to me!

## Who I worked with

Our team was called "4 corners" with people from four countries. We had a DevOps Engineer, Business Analyst, Product Owner, and even a CFO. Honestly, it was a privilege to be around such accomplished people whose lives had taken different trajectories leading them to this moment.

## The build

On the day we had a brilliant talk by someone from AWS about spec driven development. I took that talk to heart and tried building our app using that same ethos. This led me to a vibe-coded backend app in Python, the language I knew, but attempting to use production-grade infrastructure. For a 24-hour prototype, this was overkill. The AI, eager to please, happily built me something far beyond what the hackathon called for.

It reminds me of something an old colleague once told me:

> building something is easy, productionising it is the hard bit

In this hackathon, unfortunately, I started off by inverting their advice. I was productionising something before I'd built anything.

## The pivot

You can wrangle an app together in 24 hours. What matters more is whether you've thought clearly about the problem, can articulate the pain point, and can demonstrate something useful with honest tradeoffs.

- Mock APIs not crucial to the core solution instead of integrating with them.
- Stub the database or run one locally to show the core idea working.
- Later, if there's time then connect the real infra.

The lesson for me was closing the gap between ambition and execution. A gentle reminder to focus more on the problem being solved, and on building an MVP that demonstrates a useful solution.

That's what scrapping the bloated AI app got me back to. Something small, something easily understood, something we could actually show someone.

The winning teams that night? Mostly localhost applications.

## Amsterdam

After the Hackathon winners were announced, I left Bunq HQ into a city I'd been told was lovely. My cousin recommended Amsterdam as the place to be, and I could see why. Flat landscape, bike-friendly, sunny skies that week (rare, apparently), with free ferries criss-crossing the harbour, and people moving through it all with quiet competence. It felt like a larger Wellington with better trains.

I came partly to see whether I could live in Amsterdam. I left knowing I could.
