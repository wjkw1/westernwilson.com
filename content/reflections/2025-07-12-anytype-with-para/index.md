---
title: "AnyType setup with PARA"
date: 2025-07-12
lastmod: 2026-03-17
author: "Western Wilson"
tags: ["guide", "devtools"]
draft: false
---

Find out how I use Tiago Forte's PARA methodology to organise my notes inside AnyType.
If it's your first time hearing about PARA and AnyType, then lucky you!

## Setting the scene

First a bit of background, I'm a copious note-taker. I've been this way ever since I was a wee boy. Writing notes helped me focus on the speaker better, even when my notes tended to be more of a gibberish scribble and mostly illegible for future Western.
With physical note taking however I would consistently forget my notebooks and have to write on spare paper. Then I'd lose the spare paper and the state of my notes was a mixed bag.
So, I shifted to digital notes to try solve this problem. What have I tried? [Google Docs and Drive](https://drive.google.com), [OneNote](https://www.microsoft.com/en-us/microsoft-365/onenote), [BookStack](https://www.bookstackapp.com), [Wiki.js](https://js.wiki), [Confluence](https://www.atlassian.com/software/confluence), [Notion](https://www.notion.so), [Evernote](https://evernote.com), [Obsidian](https://obsidian.md), [Google Keep](https://keep.google.com), and others.

Unfortunately, no tool was perfect; they all missed one aspect of my requirements, or felt clunky, or had features locked behind paywalls, or couldn't be used while travelling without Internet access (Notion, I'm looking at you!).
My requirements:

1. Offline notes with online sync
2. Free with no paywall
3. Cross-platform – Windows, Mac & Android
4. The Notion-like block WYSIWYG text editing
5. Configurable to use PARA to organise notes (recent ~5yr old requirement)
6. Markdown export so I'm not locked into a tool
7. Great security
8. (optional) Graph view to show linkage between notes, so you can see grouped ideas
9. (optional) Import function or API to script the import
10. (optional) Collaboration with other note takers

## Introducing AnyType

AnyType hits every requirement above and took them further; open-source, offline first, free forever, online peer to peer sync between cross-platform devices, block editing with Markdown text shortcuts, AnyType Gallery to share and use community templates, great security first, imports and exports, graph view, API and basic collaboration features.
The app is positioning itself as a web3 everything app built on freedom and trust. They're building something special here and since it's inception has consistently improved month on month. It's much more polished than it used to be, it's a joy to work with nowadays.
I'll explain some of the features below, but honestly the best way to get a feel for it is to download and try it yourself: <https://download.anytype.io/>
The main concepts in AnyType to understand are:

1. [‍Objects](https://doc.anytype.io/anytype-docs/getting-started/object-editor) - all things are objects in AnyType ‍
2. [Types](https://doc.anytype.io/anytype-docs/getting-started/types) - categorise the Objects you create to have a Type ‍
3. [Properties](https://doc.anytype.io/anytype-docs/getting-started/types/relations) - attach metadata to Types and create relations between them ‍
4. [Query](https://doc.anytype.io/anytype-docs/getting-started/sets) - List view showing a single Object/Type
5. [‍Collections](https://doc.anytype.io/anytype-docs/getting-started/sets/collections) - Folder-like collection of different Objects/Types
6. [‍Templates](https://doc.anytype.io/anytype-docs/getting-started/types/templates) - speed up your workflow with pre-defined templates for object creation

For example, to create a Book tracking system, you could define:‍

1. **Book** type with the properties: Title, GoodreadsUrl, and links to an **Author**
2. **Author** type with the properties: name & bio‍
3. **Quote** type with a property that links to our **Book**

Now, when you create a new Book, you can link it to a new or existing Author and write whatever notes about the book that you want. Then when inspired by a Quote, you can create a Quote and link it to your Book. The note taking is flexible, linkage can happen anywhere organically, and you can write whatever you want from within the Author, Book or Quote types. AnyType allows and in fact encourages these relationships between Types.

{{< figure src="anytype-schema.png" caption="Conceptual example of how Book types could relate to each other in AnyType" >}}
{{< figure src="anytype-graph.png" caption="AnyType Graph View of example Book objects" >}}

## Quickly explaining PARA

If you’re new to [Tiago Forte’s PARA methodology](https://fortelabs.com/blog/para/), you’re in for a treat. PARA is a simple yet powerful system to organise your digital life—whether that’s notes, projects, or files—into four clear categories. It stands for:

- ‍**P - Projects:** Active tasks or outcomes you’re currently working on. ‍
- **A - Areas:** Ongoing responsibilities or spheres of activity without a specific end date. ‍
- **R - Resources:** Useful reference materials or topics of interest.
- ‍**A - Archives:** Inactive items you want to keep but don’t need right now.
  As you use this system over time, you’ll develop an intuitive sense for where each note belongs. The key mindset shift for me was letting go of the need to choose the “perfect” category and remembering that it’s easy to move things around later.

## How I use PARA within AnyType

Using PARA inside AnyType means you can create custom Types and Properties for each category, linking notes, tasks, and references easily. You can quickly switch between your active Projects, Areas and Resources, while your Archives keep everything tidy but accessible.
I created a Template Space that should be available to copy from the AnyGallery thanks to my approved [github submission](https://github.com/anyproto/gallery/issues/171). I'll explain how it works below.

### Key features‍

- PARA Dashboard is a Query of type Queries with a custom property **PARA Type** set to PARA
- Projects, Areas and Resources are a Query of Collection objects with the **PARA Type** set to Project, Area, or Resource respectively.
- A collection with an **Is Archive** property checked will show as Archived on the various dashboards.

### 1. 'PARA Type' Classification

- Introduces a dedicated "PARA Type" property that allows you to specify whether a Collection is a Project, Area, Resource, or **PARA.**‍
- When a Query's PARA Type is set to PARA it will show on our PARA Dashboard.
- When a Collection's PARA Type is set to Project, Area or Resource, they will display on their respective Query of Collections dashboard i.e. Projects, Areas, or Resources
- This structure makes it easy to filter, group, and view your content according to the PARA methodology.

### 2. 'Is Archive' Property

- Every **Collection** includes an **Is Archived** property.
- Easily mark items as archived to declutter your active workspace without permanently deleting anything.
- Archived items are automatically filtered out from main views but remain accessible for future reference.
- See all archived Projects, Areas and Resources both on the Archived query view, and also within their respective Projects, Areas, or Resources query views.

### 3. Manual Link Management via Templates

- Every Collection also has a "**PARA Linked to**" property, this overcomes a limitation I noticed where Queries were not showing on the Graph view for Collections created from their Query view.
- Templates automatically create this **manual link** property for each of our Projects, Areas , or Resources
- This linkage can be removed at any time, giving you control over what appears in the Graph view.
- Declutter your visual workspace by removing unnecessary connections, while still maintaining essential relationships.

### How it all works together

- ‍**Creating New Projects, Areas or Resources:** Templates are used by default to add new Projects, Areas, or Resources. Each template ensures the correct PARA Type and properties are set when creating an object from each dashboard.
- ‍**Change PARA Type:** Updating the PARA Type property on a given collection will move it between Projects, Areas or Resources as needed. This is especially helpful if, for example, a Resource evolves into a Project later on.
- **Creating New Objects:** Within any specific Project, Area, or Resource, you can add any object—the default is a Page—and it will be created with the appropriate properties. You can link any type, such as Tasks, Bookmarks, Books, Quotes, literally any Type.
- ‍**Manually Link to PARA:** Use AnyType's "Link to Collection" feature to link any object newly created to a specific Project, Area or Resource yourself. This is particularly useful in Graph view if you like to see clusters of related information.
- ‍**Archive Projects, Areas or Resources:** Archiving is handled with a simple checkbox field on Collections that have relevant PARA Types.

{{< figure src="anytype-graph-2.png" >}}

## Shared Gallery

There’s a wide variety of community-created templates available for AnyType, giving you plenty of options to explore and enhance your workflow.

It's easy to import and play with them too, simply go to the gallery and import it into a new space. While you can import templates into existing spaces, be mindful that this may introduce extra Types and Properties, potentially cluttering your setup and making cleanup tedious. So my advice is to first verify the new Types and Properties in a new, isolated space before merging them it into your main spaces.

## Conclusion & Next steps

If you’ve made it this far, congratulations! Hopefully, you’ve picked up something new and feel inspired to try out AnyType or the PARA system for your own daily organisation.

### Bonus note on AnyType's API & MCP server

Recently AnyType added an official API and Model Context Protocol (MCP) server. This advancement allows AI agents and assistants to interact with and update your documentation directly. In the [docs here](https://developers.anytype.io/docs/examples/intermediate/mcp/) they highlight [RayCast.ai](https://raycast.com/?via=western-AnyType) for seamless AI Chatbot integration and workflows.

With these tools, RayCast turns your AnyType knowledge base into an even more powerful resource—ready to answer your questions and automate parts of your note-taking system.
