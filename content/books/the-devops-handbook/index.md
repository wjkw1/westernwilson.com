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
Normally we think of heroics as great, but in DevOps of someone has to be a hero than the process has failed us and we should fix that process. Minimising heroics from the team, like late nights or weekend works, is important for the longevity of the dev team overall.

Deployment methodologies for safe deployments, one method is blue/green databases with a switch the flicks over post-successful deployment. The better solution is to actually decouple the database changes from the application, this is what I've seen done more often than not. No deletion of columns, and make sure the changes are additive only. Complex db changes require different approaches.

Use the strangler patter to safely evolve the architecture of a system over time. The strangler pattern is worth knowing about, I experienced this during my time at Xero.

## Quotes

### Introductions

> High performers deployed code thirty times more frequently, and the time required to go from “code committed” to “successfully running in production” was two hundred times faster—high performers had lead times measured in minutes or hours, while low performers had lead times measured in weeks, months, or even quarters.

> Another more extreme example is Amazon. In 2011, Amazon was performing approximately seven thousand deploys per day. By 2015, they were performing 130,000 deploys per day.

> We describe value streams, how DevOps is the result of applying Lean principles to the technology value stream, and the Three Ways: Flow, Feedback, and Continual Learning and Experimentation.

### Part I — The Three Ways

> Improving daily work is even more important than doing daily work.

> In addition to lead times and process times, the third key metric in the technology value stream is percent complete and accurate (%C/A). This metric reflects the quality of the output of each step in our value stream. Karen Martin and Mike Osterling state that “the %C/A can be obtained by asking downstream customers what percentage of the time they receive work that is ‘usable as is,’ meaning that they can do their work without having to correct the information that was provided, add missing information that should have been supplied, or clarify information that should have and could have been clearer.”

> By seeing problems as they occur and swarming them until effective countermeasures are in place, we continually shorten and amplify our feedback loops, a core tenet of virtually all modern process improvement methodologies. This maximizes the opportunities for our organization to learn and improve.

#### The First Way: The Principles of Flow

> Work is not done when Development completes the implementation of a feature—rather, it is only done when our application is running successfully in production, delivering value to the customer.

> REDUCE THE NUMBER OF HANDOFFS

> High performers, regardless of whether an engineer is in Development, QA, Ops, or Infosec, state that their goal is to help maximize developer productivity.

#### The Second Way: The Principles of Feedback

> Dr. Sidney Dekker, who also codified some of the key elements of safety culture, observed another characteristic of complex systems: doing the same thing twice will not predictably or necessarily lead to the same result. It is this characteristic that makes static checklists and best practices, while valuable, insufficient to prevent catastrophes from occurring.

> We use peer reviews of our proposed changes to gain whatever assurance is needed that our changes will operate as designed. We automate as much of the quality checking typically performed by a QA or Information Security department as possible. Instead of developers needing to request or schedule a test to be run, these tests can be performed on demand, enabling developers to quickly test their own code and even deploy those changes into production themselves. By doing this, we truly make quality everyone’s responsibility as opposed to it being the sole responsibility of a separate department.

#### The Third Way: The Principles of Continuous Learning and Experimentation

> The leader helps coach the person conducting the experiment with questions that may include:
>
> - What was your last step and what happened?
> - What did you learn?
> - What is your condition now?
> - What is your next target condition?
> - What obstacle are you working on now?
> - What is your next step?
> - What is your expected outcome?
> - When can we check?

### Part II — Where to Start

> Instead of the top-down, command-and-control approach, we need broad support from throughout the organization, especially from those doing the daily work.

> Find Innovators and Early Adopters: In the beginning, we focus our efforts on teams who actually want to help—these are our kindred spirits and fellow travelers who are the first to volunteer to start the DevOps journey.

> Based on their research, Dr. Govindarajan and Dr. Trimble assert that organizations need to create a dedicated transformation team that is able to operate outside of the rest of the organization that is responsible for daily operations (which they call the “dedicated team” and “performance engine” respectively).

> By dedicating 20% of our cycles so that Dev and Ops can create lasting countermeasures to the problems we encounter in our daily work, we ensure that technical debt doesn’t impede our ability to quickly and safely develop and operate our services in production.

> These observations led to what is now known as Conway’s Law, which states that “organizations which design systems… are constrained to produce designs which are copies of the communication structures of these organizations…. The larger an organization is, the less flexibility it has and the more pronounced the phenomenon.”

> In high-performing organizations, everyone within the team shares a common goal—quality, availability, and security aren’t the responsibility of individual departments, but are a part of everyone’s job, every day.

> As Jason Cox, Director of Systems Engineering at Disney, described, “Inside of Operations, we had to change our hiring practices. We looked for people who had ‘curiosity, courage, and candor,’ who were not only capable of being generalists but also renegades… We want to promote positive disruption so our business doesn’t get stuck and can move into the future.”

> Another way to enable high-performing outcomes is to create stable service teams with ongoing funding to execute their own strategy and road map of initiatives. These teams have the dedicated engineers needed to deliver on concrete commitments made to internal and external customers, such as features, stories, and tasks.

> Another way we can enable more market-oriented outcomes is by enabling product teams to become more self-sufficient by embedding Operations engineers within them, thus reducing their reliance on centralized Operations.

### Part III — The First Way: Flow

> Deploying the same way to every environment

> But why does using version control for our environments predict IT and organizational performance better than using version control for our code? Because in almost all cases, there are orders of magnitude more configurable settings in our environment than in our code. Consequently, it is the environment that needs to be in version control the most.

> In other words, we will only accept development work as done when it can be successfully built, deployed, and confirmed that it runs as expected in a production-like environment, instead of merely when a developer believes it to be done—ideally, it runs under a production-like load with a production-like dataset, long before the end of a sprint.

> ADOPT TRUNK-BASED DEVELOPMENT PRACTICES

> Frequent code commits to trunk means we can run all automated tests on our software system as a whole and receive alerts when a change breaks some other part of the application or interferes with the work of another developer. And because we can detect merge problems when they are small, we can correct them faster.

> Of course, we know that we need to be deploying more frequently to achieve our desired outcome of smooth and fast flow, not less frequently. To enable this, we need to decouple our production deployments from our feature releases. In practice, the terms deployment and release are often used interchangeably.

> Gracefully degrade performance: When our service experiences extremely high loads that would normally require us to increase capacity or, worse, risk having our service fail in production, we can use feature toggles to reduce the quality of service. In other words, we can increase the number of users we serve by reducing the level of functionality delivered (e.g., reduce the number of customers who can access a certain feature, disable CPU-intensive features such as recommendations, etc.).

### Part IV — The Second Way: Feedback

> As Adrian Cockcroft pointed out, “Monitoring is so important that our monitoring systems need to be more available and scalable than the systems being monitored.”

> To enable everyone to be able to find and fix problems in their daily work, we need to enable everyone to create metrics in their daily work that can be easily created, displayed, and analyzed.

> When critical production services have problems, waking people at 2 a.m. may be the right thing to do. However, when we create alerts that are not actionable or are false-positives, we’ve unnecessarily woken up people in the middle of the night.

> Tom Limoncelli, co-author of The Practice of Cloud System Administration: Designing and Operating Large Distributed Systems and a former Site Reliability Engineer at Google, relates the following story on monitoring: “When people ask me for recommendations on what to monitor, I joke that in an ideal world, we would delete all the alerts we currently have in our monitoring system. Then, after each user-visible outage, we’d ask what indicators would have predicted that outage and then add those to our monitoring system, alerting as needed. Repeat. Now we only have alerts that prevent outages, as opposed to being bombarded by alerts after an outage already occurred.”

> Before we build a feature, we should rigorously ask ourselves, “Should we build it, and why?” We should then perform the cheapest and fastest experiments possible to validate through user research whether the intended feature will actually achieve the desired outcomes. We can use techniques such as hypothesis-driven development, customer acquisition funnels, and A/ B testing, concepts we explore throughout this chapter.

> The surprising reality is that in environments with low-trust, command-and-control cultures, the outcomes of these types of change control and testing countermeasures often result in an increased likelihood that problems will occur again, potentially with even worse outcomes.

> One of the core beliefs in the Toyota Production System is that “people closest to a problem typically know the most about it.”

> Pair programming has the additional benefit of spreading knowledge throughout the organization and increasing information flow within the team. Having more experienced engineers review while the less experienced engineer codes is also an effective way to teach and be taught.

### Part V — The Third Way: Continual Learning and Experimentation

> Blameless post-mortems are about accurately learning what happened, not about assigning blame.

> During the meeting and the subsequent resolution, we should explicitly disallow the phrases “would have” or “could have,” as they are counterfactual statements that result from our human tendency to create possible alternatives to events that have already occurred. Counterfactual statements, such as “I could have…” or “If I had known about that, I should have…,” frame the problem in terms of the system as imagined instead of in terms of the system that actually exists, which is the context we need to restrict ourselves to.

> In addition to the Lean-oriented terms kaizen blitz and improvement blitz, the technique of dedicated rituals for improvement work has also been called spring or fall cleanings and ticket queue inversion weeks. Other terms have also been used, such as hack days, hackathons, and 20% innovation time.

> A dynamic culture of learning creates conditions so that everyone can not only learn, but also teach, whether through traditional didactic methods (e.g., people taking classes, attending training) or more experiential or open methods (e.g., conferences, workshops, mentoring). One way that we can foster this teaching and learning is to dedicate organizational time to it.

> Bland said, at that time, there was a 20% innovation time policy at Google, enabling developers to spend roughly one day per week on a Google-related project outside of their primary area of responsibility. Some engineers chose to form grouplets, ad hoc teams of like-minded engineers who wanted to pool their 20% time, allowing them to do focused improvement blitzes.

### Part VI: Integrating Security, Change Management and Compliance

> Instead of inspecting security into our product at the end of the process, we will create and integrate security controls into the daily work of Development and Operations, so that security is part of everyone’s job, every day. Ideally, this work will be automated and put into our deployment pipeline. Furthermore, we will augment our manual practices, acceptances, and approval processes with automated controls, relying less on controls such as separation of duties and change approval processes.

> Source code integrity and code signing: All developers should have their own PGP key, perhaps created and managed in a system such as keybase.io.

> OWASP publishes a great deal of useful guidance such as the Cheat Sheet series, which includes: How to store passwords How to handle forgotten passwords How to handle logging How to prevent cross-site scripting (XSS) vulnerabilities

> No one actually looks at the unit tests, and they’re run every time someone commits code to the repo.” This demonstrates that in order to adequately protect the integrity of our applications and environments, we must also mitigate the attack vectors on our deployment pipeline.

> In this case, we must ensure that any submitted change requests are as complete and accurate as possible, giving the CAB everything they need to properly evaluate our change—after all, if our change request is malformed or incomplete, it will be bounced back to us, increasing the time required for us to get into production and casting doubt on whether we actually understand the goals of the change management process.

> For Mangot and Mathew, one of the key successes from all the repeatability and rigor they designed into the process was being told by their change management group that “infrastructure changes made through Puppet would now be treated as ‘standard changes,’ requiring far less or even no further approvals from the CAB.” Furthermore, they noted that “manual changes to infrastructure would still require approvals.”

### Appendices

> APPENDIX 9 THE SIMIAN ARMY After the 2011 AWS EAST Outage, Netflix had numerous discussions about engineering their systems to automatically deal with failure. These discussions have evolved into a service called “Chaos Monkey.”
