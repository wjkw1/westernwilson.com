---
title: "Clean Code"
date: 2026-06-16
author: "Western Wilson"
draft: false
bookAuthor: "Robert C. Martin"
bookDescription: "A handbook of agile software craftsmanship. Uncle Bob argues that writing clean code is a skill and a discipline — one that separates programmers who write code that works from those who write code that lasts. Covers naming, functions, comments, formatting, error handling, and testing through practical examples and refactoring exercises."
goodreadsUrl: "https://www.goodreads.com/book/show/3735293-clean-code"
dateRead: 2026-06-16
rating: 5
bookCover: "cover.jpg"
---

## Notes on Clean Code

This book is packed with examples and opinions by people with decades of experience. Martin has clearly written a lot of code and seen a lot of projects go sideways, then picked up the pieces and improved them.

My central takeaway is that the cost of bad code is huge, and it compounds over time. A team that moves fast with messy code will eventually stall. Anyone who has picked up someone else's code and spent an hour just trying to figure out what it does will know exactly what he means.

There was a comment about Coders being essentially Authors, I don't know why, but was a paradigm shift in my brain. We are writers using language syntax that tells machines what to do, but also has to show other Authors/engineers what it does. So be professional and communicate clearly. You've read bad articles or books, and you've read good ones, make sure your code aligns closely with the good ones.

He put a lot of emphasis on the effort you should spend on good names. But not letting that effort slow you down because it is refactorable. Both of these change how I think about naming things.

A clever shorthand variable name might save you ten seconds when you write it, but it'll cost the next person ten minutes when they read it.

A good variable or function name is a small piece of documentation that you never have to keep in _sync_ with the code, because it _is_ the code. The time you spend thinking of a better name is almost always worth it.

Functions should do one thing. That principle sounds obvious until you realise how hard it actually is to follow. While reading this chapter I remembered functions I'd written that did a few things, and cringed. Ideally, the function should do one thing well, and be named in line with exactly what it does.

I'd heard these comment vs code arguments from an old colleague, this book reemphasised what he was saying. Comments are a failure; they're a sign that the code isn't clear enough to speak for itself. Every comment you write is maintenance debt. Code changes; comments drift. There's nothing worse than a comment that confidently describes something the code no longer does. I agreed with this chapter wholeheartedly.

The boy scout rule is great too: leave the campground cleaner than you found it. Don't just fix the bug and ship it. Rename the thing that confused you, or extract the chunk that didn't belong. Don't rewriting everything, but small incremental improvements accumulating over time into a codebase makes it actually pleasant to work in.

One key idea to me was the purpose of writing OOP; from what I gather, it's to make the code easily changeable and extensible in such a way that future features are easier to add. This tends to look like standardised patterns so you know exactly how to make changes to extend the code without stepping on each others toes. By following uncle Bob's rules in this book, you can both make code easy to understand, but also easy to change.

The final chapters taught me that writing clean code is not something you get right the first time. It's like writing an article or blog post, you have multiple stages of drafts, and over time the output condenses into something legible.

The book shows a systematic way go from idea to messy code, then from messy code to refactored clean code (iteratively). To do this, automated unit tests are a requirement. OOP helps make testing easier by abstracting away key components of the system.

## Quotes

### Foreword

> Clean code honors the deep roots of wisdom beneath our broader culture, or our culture as it once was, or should be, and can be with attentiveness to detail.

> It is a recommended practice in Scrum that re-factoring be part of the concept of “Done.” Neither architecture nor clean code insist on perfection, only on honesty and doing the best we can. To err is human; to forgive, divine. In Scrum, we make everything visible. We air our dirty laundry. We are honest about the state of our code because code is never perfect.

### Chapter 1 Clean Code

> They are hoping that one day we will discover a way to create machines that can do what we want rather than what we say. These machines will have to be able to understand us so well that they can translate vaguely specified needs into perfectly executing programs that precisely meet those needs.

Truth. Though I strive to not allow it to be my truth.

> We’ve all said we’d go back and clean it up later. Of course, in those days we didn’t know LeBlanc’s law: Later equals never .

I worked somewhere stuck in this same situation, it's so refreshing to know that 1) it wasn't a unique experience to me, and 2) that there are ways around it.

> Now the two teams are in a race. The tiger team must build a new system that does everything that the old system does. Not only that, they have to keep up with the changes that are continuously being made to the old system. Management will not replace the old system until the new system can do everything that the old system does. This race can go on for a very long time. I’ve seen it take 10 years. And by the time it’s done, the original members of the tiger team are long gone, and the current members are demanding that the new system be redesigned because it’s such a mess.

> You will not make the deadline by making the mess. Indeed, the mess will slow you down instantly, and will force you to miss the deadline. The only way to make the deadline—the only way to go fast—is to keep the code as clean as possible at all times.

> Bjarne Stroustrup, inventor of C + + and author of The C + + Programming Language

> But don’t make the mistake of thinking that we are somehow “right” in any absolute sense. There are other schools and other masters that have just as much claim to professionalism as we. It would behoove you to learn from them as well.

> We are authors. And one thing about authors is that they have readers. Indeed, authors are responsible for communicating well with their readers. The next time you write a line of code, remember you are an author, writing for readers who will judge your effort.

> It’s not enough to write the code well. The code has to be kept clean over time. We’ve all seen code rot and degrade as time passes. So we must take an active role in preventing this degradation.

### Chapter 2 Meningful Names

> The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

> Classes and objects should have noun or noun phrase names like Customer , WikiPage , Account , and AddressParser . Avoid words like Manager , Processor , Data , or Info in the name of a class. A class name should not be a verb.

> Single-letter variable names are only acceptable as loop counters. Everything else deserves better.

> The name AccountVisitor means a great deal to a programmer who is familiar with the VISITOR pattern. What programmer would not know what a JobQueue was? There are lots of very technical things that programmers have to do. Choosing technical names for those things is usually the most appropriate course.

### Chapter 3 Functions

> Functions that do one thing cannot be reasonably divided into sections.
> ...
> To say this differently, we want to be able to read the program as though it were a set of TO paragraphs, each of which is describing the current level of abstraction and referencing subsequent TO paragraphs at the next level down. To include the setups and teardowns, we include setups, then we include the test page content, and then we include the teardowns.

> The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that.

> Functions should do one thing. They should do it well. They should do it only.
> This feels achievable until you're actually in the middle of writing something and you just want to add one more thing because it's almost related.

> A function with two arguments is harder to understand than a monadic function. For example, writeField( name) is easier to understand than writeField( output-Stream, name). Though the meaning of both is clear, the first glides past the eye, easily depositing its meaning. The second requires a short pause until we learn to ignore the first parameter. And that, of course, eventually results in problems because we should never ignore any part of code. The parts we ignore are where the bugs will hide.

Have No Side Effects Side effects are lies. Your function promises to do one thing, but it also does other hidden things. Sometimes it will make unexpected changes to the variables of its own class.

In general output arguments should be avoided. If your function must change the state of something, have it change the state of its owning object.

On the other hand, if you use exceptions instead of returned error codes, then the error processing code can be separated from the happy path code and can be simplified:

### Chapter 4 Comments

So when you find yourself in a position where you need to write a comment, think it through and see whether there isn’t some way to turn the tables and express yourself in code.

Others who see that commented-out code won’t have the courage to delete it. They’ll think it is there for a reason and is too important to delete.

> Every time you write a comment, you should grimace and feel the failure of your ability of expression.

### Chapter 5 Formatting

We use horizontal white space to associate things that are strongly related and disassociate things that are more weakly related.

### Chapter 6 Objects and Data Structures

In any complex system there are going to be times when we want to add new data types rather than new functions. For these cases objects and OO are most appropriate. On the other hand, there will also be times when we’ll want to add new functions as opposed to data types. In that case procedural code and data structures will be more appropriate.

More precisely, the Law of Demeter says that a method f of a class C should only call the methods of these: • C • An object created by f • An object passed as an argument to f • An object held in an instance variable of C The method should not invoke methods on objects that are returned by any of the allowed functions.

Note: look into procedural vs oop methodoloies and programming.
They have functions that do significant things, and they also have either public variables or public accessors and mutators that, for all intents and purposes, make the private variables public, tempting other external functions to use those variables the way a procedural program would use a data structure.

The quasi-encapsulation of beans seems to make some OO purists feel better but usually provides no other benefit.

### Chapter 7 Use Exceptions Rather Than Return Codes

Use Exceptions Rather Than Return Codes

Create informative error messages and pass them along with your exceptions. Mention the operation that failed and the type of failure. If you are logging in your application, pass along enough information to be able to log the error in your catch

I think that any discussion about error handling should include mention of the things we do that invite errors. The first on the list is returning null . I can’t begin to count the number of applications I’ve seen in which nearly every other line was a check for null . Here is some example code:

It’s easy to say that the problem with the code above is that it is missing a null check, but in actuality, the problem is that it has too many . If you are tempted to return null from a method, consider throwing an exception or returning a SPECIAL CASE object instead.

### Chapter 8 Boundaries

If you use a boundary interface like Map, keep it inside the class, or close family of classes, where it is used. Avoid returning it from, or accepting it as an argument to, public APIs.

In learning tests we call the third-party API, as we expect to use it in our application. We’re essentially doing controlled experiments that check our understanding of that API. The tests focus on what we want out of the API.

We manage third-party boundaries by having very few places in the code that refer to them. We may wrap them as we did with Map , or we may use an ADAPTER to convert from our perfect interface to the provided interface. Either way our code speaks to us better, promotes internally consistent usage across the boundary, and has fewer maintenance points when the third-party code changes.

### Chapter 9 Unit Tests

in the mad rush to add testing to our discipline, many programmers have missed some of the more subtle, and important, points of writing good tests.

First Law You may not write production code until you have written a failing unit test. Second Law You may not write more of a unit test than is sufficient to fail, and not compiling is failing. Third Law You may not write more production code than is sufficient to pass the currently failing test.

The moral of the story is simple: Test code is just as important as production code. It is not a second-class citizen. It requires thought, design, and care. It must be kept as clean as production code.

That is the nature of the dual standard. There are things that you might never do in a production environment that are perfectly fine in a test environment. Usually they involve issues of memory or CPU efficiency. But they never involve issues of cleanliness.

Timely The tests need to be written in a timely fashion. Unit tests should be written just before the production code that makes them pass. If you write tests after the production code, then you may find the production code to be hard to test. You may decide that some production code is too hard to test. You may not design the production code to be testable.

> Clean boundaries. Code at the boundaries needs clear separation and tests that define expectations.
> There's a whole class of bugs that only exist because the assumptions on one side of an API boundary were never written down anywhere. Tests are the written-down version.

### Chapter 10 Classes

There is seldom a good reason to have a public variable. Public functions should follow the list of variables. We like to put the private utilities called by a public function right after the public function itself. This follows the stepdown rule and helps the program read like a newspaper article.

With functions we measured size by counting physical lines. With classes we use a different measure. We count responsibilities

The problem is that too many of us think that we are done once the program works. We fail to switch to the other concern of organization and cleanliness. We move on to the next problem rather than going back and breaking the overstuffed classes into decoupled units with single responsibilities.

many developers fear that a large number of small, single-purpose classes makes it more difficult to understand the bigger picture. They are concerned that they must navigate from class to class in order to figure out how a larger piece of work gets accomplished. However, a system with many small classes has no more moving parts than a system with a few large classes. There is just as much to learn in the system with a few large classes. So the question is: Do you want your tools organized into toolboxes with many small drawers each containing well-defined and well-labeled components? Or do you want a few drawers that you just toss everything into?

To restate the former points for emphasis: We want our systems to be composed of many small classes, not a few large ones.

We learned in OO 101 that there are concrete classes, which contain implementation details (code), and abstract classes, which represent concepts only.

### Chapter 11 Systems

Domain-Specific Languages allow all levels of abstraction and all domains in the application to be expressed as POJOs, from high-level policy to low-level details.

Whether you are designing systems or individual modules, never forget to use the simplest thing that can possibly work .

### Chapter 12 Emergence

As systems become more complex, they take more and more time for a developer to understand, and there is an ever greater opportunity for a misunderstanding. Therefore, code should clearly express the intent of its author. The clearer the author can make the code, the less time others will have to spend understanding it. This will reduce defects and shrink the cost of maintenance. You can express yourself by choosing good names. We want to be able to hear a class or function name and not be surprised when we discover its responsibilities. You can also express yourself by keeping your functions and classes small. Small classes and functions are usually easy to name, easy to write, and easy to understand.

### Chapter 13 Concurrency

Recommendation : Write tests that have the potential to expose problems and then run them frequently, with different programatic configurations and system configurations and load. If tests ever fail, track down the failure. Don’t ignore a failure just because the tests pass on a subsequent run.

Recommendation : Run your threaded code on all target platforms early and often.

The point is to jiggle the code so that threads run in different orderings at different times. The combination of well-written tests and jiggling can dramatically increase the chance finding errors.

### Chapter 14 JUnit Internals

I don’t like the way that the last two lines of the new function return variables, but the first two don’t. They aren’t using consistent conventions [G11]. So we should change findCommonPrefix and findCommonSuffix to return the prefix and suffix values.

### Chapter 16 Refactoring SerialDate

This chapter was hard to read on my ereader, like it took a bit of time to disect what was happening. But the explanations that walked you through his thinking when refactoring was SO GOOD. There are probably Youtubers who walk through code like this too, giving me a new angle and new lease on thinking about writing good code.

> It’s generally a bad idea for base classes to know about their derivatives. To fix this, we should use the ABSTRACT FACTORY 3 pattern and create a DayDateFactory . This factory will create the instances of DayDate that we need and can also answer questions about the implementation, such as the maximum and minimum dates.

> The next abstract method is toDate (lines 838–844). It converts a DayDate to a java.util.Date . Why is this method abstract? If we look at its implementation in SpreadsheetDate (lines 198–207, Listing B-5 , page 382 ), we see that it doesn’t depend on anything in the implementation of that class [G6]. So I pushed it up.

### Chapter 17 Smells and Heuristics

All else being equal, we want to eliminate Feature Envy because it exposes the internals of one class to another. Sometimes, however, Feature Envy is a necessary evil.

This is a great example of how to make code more readable by avoiding selector arguments. With selector arguments we break the single responsibility principle, which is bad because it makes the code harder to understand.

> There is hardly anything more abominable than a dangling false argument at the end of a function call. What does it mean? What would it change if it were true ? Not only is the purpose of a selector argument difficult to remember, each selector argument combines many functions into one.

I like this, I often get troubled with reading boundaries for `++` or `-=1` and sometimes result to trial and error.

> Notice that level + 1 appears twice. This is a boundary condition that should be encapsulated within a variable named something like nextLevel . int nextLevel = level + 1; if( nextLevel < tags.length) { parts = new Parse( body, tags, nextLevel, offset + endTag); body = null; }

> More specifically, if A collaborates with B , and B collaborates with C , we don’t want modules that use A to know about C . (For example, we don’t want a.getB(). getC(). doSomething() ;.) This is sometimes called the Law of Demeter. The Pragmatic Programmers call it “Writing Shy Code.” 12 In

> Rather we want our immediate collaborators to offer all the services we need. We should not have to roam through the object graph of the system, hunting for the method we want to call. Rather we should simply be able to say: myCollaborator.doSomething().

> J2: Don’t Inherit Constants I have seen this several times and it always makes me grimace. A programmer puts some constants in an interface and then gains access to those constants by inheriting that interface.

> T6: Exhaustively Test Near Bugs Bugs tend to congregate. When you find a bug in a function, it is wise to do an exhaustive test of that function. You’ll probably find that the bug was not alone.

## Appendix A Concurrency II

On evaluating and understanding how complex async programming becomes.

> If the code is processor bound, more processing hardware can improve throughput, making our test pass. But there are only so many CPU cycles available, so adding threads to a processor-bound problem will not make it go faster. On the other hand, if the process is I/ O bound, then concurrency can increase efficiency. When one part of the system is waiting for I/ O, another part can use that wait time to process something else,

> And this is a simple problem. If we cannot demonstrate broken code easily with this problem, how will we ever detect truly complex problems? So what approaches can we take to demonstrate this simple failure? And, more importantly, how can we write tests that will demonstrate failures in more complex code? How will we be able to discover if our code has failures when we do not know where to look?
