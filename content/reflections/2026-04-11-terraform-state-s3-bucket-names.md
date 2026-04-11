---
title: "Terraform state s3 bucket naming convention"
date: 2026-04-11
author: "Western Wilson"
slug: "terraform-state-s3-bucket-naming-convention"
tags: ["definitions", "devops", "coffee-app"]
---

While working on my personal devops project ([see github](https://github.com/wjkw1/devops-profile-coffee-card-app-demo)), I realised I hadn't thought through the naming convention of my terraform state in a long time.

## Naming convention decision

**Final name:** `tfstate-{AccountId}-{GitHubRepo}`

**Example:** `tfstate-123456789012-aws-foundations`

### Why this name

The convention earns its structure because I'm committing to one terraform state bucket per project.

So, the three pieces of information communicated in the bucket name:

| Segment            | Reason                                                                                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tfstate` _prefix_ | Immediately identifies the bucket's purpose to any observer, without needing to open it.                                                                                                        |
| `{AccountId}`      | The only reliable way to guarantee global S3 uniqueness (bucket names are shared across all of AWS); also identifies ownership at a glance in billing, access logs, and cross-account contexts. |
| `{GitHubRepo}`     | 1:1 mapping between bucket and repository — you can navigate from S3 → GitHub (or back) without any lookup.                                                                                     |

The convention scales cleanly: every future infrastructure repository gets `tfstate-{AccountId}-{GitHubRepo}`, with no naming decisions to revisit.

### Options considered and why they were rejected

**`tfstate-aws-foundations`**

Not globally unique, and almost certainly already taken thanks to the known limitation of S3. It also encodes the github project name in a bucket originally conceived as potentially holding all account state. Once my intent changed, the name became misleading.

**`tfstate-{AccountId}`** _(original)_

Unique and future-proof, but loses the repo link. Fine if one bucket holds state for many projects; less good when the bucket is scoped 1:1 to a single repo, where the link has real navigational value.

**`{AccountId}-aws-foundations`**

Globally unique, still links to the repo. But without a `tfstate` indicator, anyone browsing S3 has no immediate signal about what the bucket is for. The AccountId prefix also groups infrastructure buckets together when sorted, at the cost of reading unnaturally left-to-right.

**`aws-foundations-{AccountId}`**

More readable than the account-first example, same repo link. Still missing the `tfstate` indicator.

**`tfstate-{AccountId}-aws-foundations`** _(chosen)_

Purpose is obvious. Guaranteed to be unique. The 1:1 GitHub mapping is perfect. The tradeoff: twelve digits in the middle makes the name long and not great to say out loud. That cost is low because this string gets typed approximately twice in the bucket's lifetime -- at creation and in `versions.tf` -- so conversational readability is not important.

### Convention going forward

`tfstate-{AccountId}-{GitHubRepo}`

Other projects I create that require aws infra will each get their own S3 state bucket following this pattern.

This gives me state isolation between projects; a terraform mistake in one project cannot affect another, and state files stay small and fast.
