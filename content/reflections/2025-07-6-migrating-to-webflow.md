---
title: "Migration to Webflow & Hugo"
date: 2025-07-06
lastmod: 2026-03-17
author: "Western Wilson"
tags: ["devtools", "meta"]
draft: false
---

*Update 2026: Turns out Webflow and I didn't get along for long. My workflow is drafting everything in AnyType, but copy-pasting from there into Webflow was a mess. I'd spend more time cleaning up the output than actually writing. The custom domain redirect situation was also irking me. So, true to form, I redesigned and migrated again, this time to [Hugo](https://gohugo.io). Make of that what you will.*

My website has gone through many iterations and frameworks:

1. Static site using html, css & JavaScript
2. Gatsby.js React framework
3. Quick attempt at using Next.js React
4. Nuxt.js Vue.js framework
5. Now Webflow

My goal was to get something that worked easily, let me update a blog quickly, and didn't require too much maintenance. Finally, I've achieved that vague and ambitious goal with Webflow.

## Bit of historical context

### Basic static site

While at University, near 2015 I was first learning software development as a main focus. I felt like I needed an online personal profile, but I didn't really know how to do it. So across 4 years I managed to cobble something together, though it wasn't pretty and I haven't got any screenshots to show it off.
My first profile website used basic html and css. Honestly, not enjoyable... the css process took so much time and tweaking that eventually it caused longer and longer procrastination breaks (gaming). I finally understood the devs struggling with css memes.
Skip ahead to my first graduate job, I learnt there are other ways to develop and I trusted that there had to be an easier way than crying over css (joking). So, with the internet at my disposal, I searched for a modern framework to build and deploy my site.

### GatsbyJS

The many rabbit-holes I ventured figuring out what the "best" framework was, watching YouTube, doing tutorials of each framework and creating starter programs. Eventually I realised I was thinking about doing, but not actually getting anywhere, so I just leapt into one of them.
Introducing GatsbyJS, which at the time was a new React framework that helped build static sites quickly from templates, it even had blog plugins to make the whole process easier, so this was exactly what I was looking for... or so I thought.
My basic knowledge of html, css, and javascript helped, but I had to learn React, JSX syntax, Webpack, and how to deploy my site. They had docs, but it wasn't super polished so there was a lot of time spent figuring it out on my own. On a grad salary I was looking for the cheapest (free) options for hosting; there were two options: GitHub Pages and Netlify.
First, I tried GitHub Pages and succeeded in deploying it, but the workflow was tacky, it required me to run a command from my local machine to deploy it, which didn't feel right.
I learnt about Git Flow and wanted it to deploy when I pushed up my code up to master (I know that's not entirely correct, and am now aware that PRs and merges offer a nicer dev workflow flow, but at the time pushing to master was the way).
So I moved to Netlify, which watched your repository for changes on a specific branch, and deployed whatever was there for you. This worked great for me, and allowed me to iterate with development on Gatsby quickly. However... as it was early on, the framework and plugins were changing often. Updating the npm packages caused the website to break so much that I gave up making changes to the website altogether. I resigned to allowing my website to exist in it's current state. Until I got inspired by a front-end engineer at another company I worked at.
For added context, my career was taking me down the DevOps Engineer pathway, but I still enjoyed playing around with front-end development. So I'd chat to other engineers about what they were doing and what they enjoyed using. This inspired my next framework choice that I thought would surely be easier.

### NuxtJS

Inspired by my teammate, and with an expert to back me should I fall into any of the traps. I started building a Nuxt website. I gave up on designing a website and though, "lets just get something working".
Following through the docs I cobbled together a very basic website that used their content module to generate pages from markdown. This allowed me to at least write blogs using markdown text and the pages would generate on deployment.
The deployment was done through GitHub Pages and I eventually got it deploying using GitHub Actions, which I was using more at work. This was great and Nuxt v2 was working well.
Then the Nuxt v3 update happened, and all my shit broke. So I spend another weekend tweaking and figuring out why the content renderers wouldn't load my blog pages from Markdown. Turns out the interface changed for how we loaded content, so the old method didn't work.
With that fixed, I happily added a blog about using ChatGPT or Perplexity to support my writing style. Woohoo!

### Time skip to now

I'm taking a break from work, travelling asia (see /blog/now-june-2025), I decided to attempt to write blogs to capture my learnings while creating music.
Looking ahead to writing 10 or more blogs, I realised how much of a hassle my Nuxt stack would be for updating and posting blogs. Changes required markdown updates pushed to a git branch and merged into main, I could immediately see this adding friction that would stop me from doing the actual blog writing. Also because of how I was loading blog images, it made the whole /public/img/ directory structure ugly, and in the future I would have a huge dump of images that were difficult to update.
Honestly, I might not even write so many blogs that this becomes a problem, but this future problem was enough to distract me from making music. I didn't want to create a big mess that I had to clean up later so I looked for another solution.
I looked into WordPress quickly, which a couple older colleagues of mine used for their personal blogs and another colleague who built the company websites using WordPress. It would've worked, and been cheap, but I didn't want to touch it. It felt old, and I knew there were better tools out there.

## So, why Webflow?

I was on LinkedIn one day and saw a post from Nikolai teaching people how to use Webflow. Nikolai actually introduced me to webflow way back in 2017 and it'd been swirling in my brain ever since, it seemed like a great tool. It's fantastic for Web Designer to build websites without worrying about the nitty gritty of maintaining a website with code. It still requires fundamental understandings of website development and html & css, but it's mostly no-code.
After the whole Nuxt Vue major update I thought I cbf with this, lets try Webflow out.
I don't want to pay for Webflow yet, thats why my site is only available on <https://westernwilson.webflow.io>, in the future I intend to upgrade it so I can use my personal website url under <https://westernwilson.com>

## What is the development process like?

I kind of cheated a bit, I used their AI tool to design and kick-start my new and improved personal profile website, then I tweaked the required bits and here we have it, a new website! The tweaking of Webflow was much easier for me than the frameworks. Everything you need to understand is in their docs, and to publish is very easy. No updating of packages under the hood, and it all just works.
To be honest, the Webflow structure I currently have could probably be improved, but I'll leave it as is for now since it works.
The major learning was configuring the Content Management System (CMS) that comes in-built with Webflow to store my blogs. Couple searches on the web and Perplexity helped me figure this out over a day or so.
So now, I have a blog website that gets updated from a CMS. I'm stoked! Adding links or audio files is a lot easier than before too.
You still need some understanding of how web development html tags are structured and how they pair with css styling, but for me this solution is perfect.

## Final words

I'm happy with Webflow, because now I can focus on playing around making music and writing blogs instead of constantly upgrading and tweaking my website.
