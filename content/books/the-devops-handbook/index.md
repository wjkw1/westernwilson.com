---
title: "The DevOps Handbook"
date: 2026-09-06
draft: false
bookAuthor: "Gene Kim, Jez Humble, Patrick Debois, John Willis"
bookDescription: "The practitioner's companion to The Phoenix Project. It lays out how high-performing technology organisations actually ship software as the Three Ways — flow, feedback, and continual learning — backed by case studies from Google, Amazon, Etsy and Netflix."
goodreadsUrl: "https://www.goodreads.com/book/show/26083308-the-devops-handbook"
dateRead: 2026-08-31
rating: 5
bookCover: "cover.jpg"
---

## Notes on The DevOps Handbook

I've read this book twice now, once early on in my career and again now whilst having a breadth of more DevOps experience at companies with different levels of DevOps maturity.
I found myself skimming sections that weren't as useful to me now, but re-reading in detail sections I found new insights from. You'll be able to tell which based on my most recent quote pulls at the end.
The whole book hangs off the Three Ways, which is kind of funny because Taoism talks about "The Way", so this recent reading reminded me of Taoism and the book I recently read there.

- The First Way is flow: get work moving left to right, from the business to the customer, as fast as possible.
- The Second Way is feedback: get signal moving right to left, fast and constantly, so problems get fixed near where they were made.
- The Third Way is a culture of experimentation and learning, where you deliberately take risks and treat failure as information rather than something to hide.

The best companies I've worked at give a culture safety to experimentation, AND provide tooling to support safe experiments. Which in essence gives cultural safety again! If deploys are scary, that's a signal about your architecture and your test coverage, not about the inherent difficulty of shipping.

Continuous integration, trunk-based development, telemetry everywhere(!!!), feature flags, and labelling low-risk releases.

Small batches of changes are important to make failures small, cheap, easy to attribute, and easy to rollback. Big batches make failures ambiguous and tough to revert.

The importance of blameless postmortem was rehighlighted here, Atlassian has a great doc on it. The argument is that blame drives information under the rug, if naming a cause means naming a person who gets punished, you stop learning what actually happened, remove cultural safety of experimentation, and reduce the effectiveness of the whole investigation.

Workshops and their importance to get everyone involved so we can discover the quick wins; this is workshops including both tech experts, decision makers, and domain experts.

Value Stream mapping is next exercise, showing how new features (or new value) is added to the app. Probably customer request or business hypothesis, flowing through planning, dev, and deploy.
There is skill involved in identifying the teams involved with a given Value stream. I think that a value stream is a domain within a company and the value that a given team (or cluster of teams) offers the customer.

One key thing that tends to happen is surfacing of the many heroics across the business.
Normally we think of heroics as great, but in DevOps if someone has to be a hero then the process has failed us and we should fix that process. Minimising heroics from the team, like late nights or weekend works, is important for the longevity of the dev team overall.

Deployment methodologies for safe deployments, one method is blue/green databases with a switch the flicks over post-successful deployment. The better solution is to actually decouple the database changes from the application, this is what I've seen done more often than not. No deletion of columns, and make sure the changes are additive only. Complex db changes require different approaches.

Use the strangler pattern to safely evolve the architecture of a system over time. The strangler pattern is worth knowing about, I experienced this during my time at Xero.

## Quotes

### Introductions

> High performers deployed code thirty times more frequently, and the time required to go from “code committed” to “successfully running in production” was two hundred times faster—high performers had lead times measured in minutes or hours, while low performers had lead times measured in weeks, months, or even quarters.

### Part I — The Three Ways

> Improving daily work is even more important than doing daily work.

> Work is not done when Development completes the implementation of a feature—rather, it is only done when our application is running successfully in production, delivering value to the customer.

> Dr. Sidney Dekker, who also codified some of the key elements of safety culture, observed another characteristic of complex systems: doing the same thing twice will not predictably or necessarily lead to the same result. It is this characteristic that makes static checklists and best practices, while valuable, insufficient to prevent catastrophes from occurring.

### Part III — The First Way: Flow

> But why does using version control for our environments predict IT and organizational performance better than using version control for our code? Because in almost all cases, there are orders of magnitude more configurable settings in our environment than in our code. Consequently, it is the environment that needs to be in version control the most.

> Of course, we know that we need to be deploying more frequently to achieve our desired outcome of smooth and fast flow, not less frequently. To enable this, we need to decouple our production deployments from our feature releases. In practice, the terms deployment and release are often used interchangeably.

### Part IV — The Second Way: Feedback

> As Adrian Cockcroft pointed out, “Monitoring is so important that our monitoring systems need to be more available and scalable than the systems being monitored.”

> Tom Limoncelli, co-author of The Practice of Cloud System Administration: Designing and Operating Large Distributed Systems and a former Site Reliability Engineer at Google, relates the following story on monitoring: “When people ask me for recommendations on what to monitor, I joke that in an ideal world, we would delete all the alerts we currently have in our monitoring system. Then, after each user-visible outage, we’d ask what indicators would have predicted that outage and then add those to our monitoring system, alerting as needed. Repeat. Now we only have alerts that prevent outages, as opposed to being bombarded by alerts after an outage already occurred.”

> The surprising reality is that in environments with low-trust, command-and-control cultures, the outcomes of these types of change control and testing countermeasures often result in an increased likelihood that problems will occur again, potentially with even worse outcomes.

### Part V — The Third Way: Continual Learning and Experimentation

> During the meeting and the subsequent resolution, we should explicitly disallow the phrases “would have” or “could have,” as they are counterfactual statements that result from our human tendency to create possible alternatives to events that have already occurred. Counterfactual statements, such as “I could have…” or “If I had known about that, I should have…,” frame the problem in terms of the system as imagined instead of in terms of the system that actually exists, which is the context we need to restrict ourselves to.
