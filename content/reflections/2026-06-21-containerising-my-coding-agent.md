---
title: "Containerising my coding agent"
date: 2026-06-21
slug: "containerising-my-coding-agent"
tags: ["ai", "devtools", "devops"]
---

I containerised Claude Code this week because I wanted to let it run with fewer guardrails and not hand it unlimited access the rest of my machine. There's a [Hacker News thread](https://news.ycombinator.com/item?id=46268222) from 6 months ago about someone running Claude in yolo mode who asked it to clean something up and watched it `rm -rf` their home directory 😅. So let's aim to at least avoid that.

Thankfully, I found [Dev Containers](https://containers.dev), which turned into its own rabbit hole but lets us lock down Claude without having to maintain our own docker image.

This reflection post talks through the containerised setup and some issues I faced while setting it up. If you just want the solution, then the implementation is in the [.devcontainer/](https://github.com/wjkw1/westernwilson.com/tree/main/.devcontainer) directory of this website's source code.

## Feature or docker image?

I assumed that Anthropic would ship an official Claude base image you build on top of. They don't, they only post a recommended starting point. Claude Code installs into any [Dev Container](https://code.claude.com/docs/en/devcontainer) through the `ghcr.io/anthropics/devcontainer-features/claude-code:1.0` feature, which you reference in `devcontainer.json` like [any other devcontainers feature](https://containers.dev/features). It works wherever the Dev Containers spec is supported e.g. VS Code, Codespaces, JetBrains, and (with some rough edges) Cursor. In VS Code it can be configured to pull in the Claude Code extension, keeping Claude decoupled from the base image entirely.

That leaves three layers to assemble: a base image, the tooling you use, and Claude Code on top. The real decision is whether you bake those middle two layers into a custom docker image you push to a registry, or assemble them per-repo through `devcontainer.json` features. A custom image is the better call for a team, where you want a validated, secure, and reusable environment everyone builds on. For a solo setup spun up per-repo, features are easier. The cost is a slow first build and less control over exactly what lands in the image, which is what `post-create.sh` helps automate somewhat.

My `devcontainer.json` ended up looking like this, trimmed to the main parts:

```jsonc
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  },
  "remoteUser": "vscode",
  "mounts": [
    "source=claude-code-config-${devcontainerId},target=/home/vscode/.claude,type=volume"
  ],
  "runArgs": ["--cap-add=NET_ADMIN", "--cap-add=NET_RAW"],
  "postCreateCommand": "sudo zsh .devcontainer/post-create.sh",
  "postStartCommand": "sudo /usr/local/sbin/init-firewall.sh",
  "waitFor": "postStartCommand"
}
```

The non-root `vscode` user is important if you ever run with `--dangerously-skip-permissions`, Claude Code requires it. The named volume on `~/.claude` means login persists across rebuilds instead of re-authenticating every time. The `NET_ADMIN`/`NET_RAW` capabilities exist so that we can create the containerised firewall. `waitFor: postStartCommand` blocks the terminal until that firewall script finishes, so there's no window where Claude is already running before egress is locked down.

`post-create.sh` is the everyday stuff a feature-based setup doesn't hand you for free: setting git aliases, adding a couple of zsh aliases for `kubectl` and `terraform`, locking down `sudo`/`su`.

`init-firewall.sh` sets default-DROP policies on iptables, then builds an `ipset` allowlist of everything the container is allowed to reach outbound. Part of that allowlist is GitHub's own published IP ranges, fetched live at container start:

```zsh
gh_ranges=$(curl -s https://api.github.com/meta)
while read -r cidr; do
    ipset add allowed-domains "$cidr"
done < <(echo "$gh_ranges" | jq -r '(.web + .api + .git)[]' | aggregate -q)
```

Everything else —npm, `api.anthropic.com`, the VS Code marketplace— gets resolved and added individually. The firewall script finishes by checking its own work: it tries `curl https://example.com` and expects that to fail, then tries `curl https://api.github.com/zen` and expects that to succeed.

## Firewall and sudo

I spent a decent chunk of time configuring who's allowed to touch `iptables`. The `common-utils` feature grants the `vscode` user blanket passwordless `sudo` by default, and my first cut of `post-create.sh` narrowed that down to the `iptables`/`iptables-save`/`ipset` binaries themselves, with no argument restriction. Which meant Claude or anything else running as `vscode`, including under `--dangerously-skip-permissions`, could just run `sudo iptables -F && sudo iptables -P OUTPUT ACCEPT` and the firewall would be gone! Anthropic's own reference devcontainer avoids this by granting `sudo` on one fixed script path instead of the raw binaries, baked into their image at build time so the script itself can't be edited either. I didn't want a custom Dockerfile yet, but dev containers can do the same thing with just `postCreateCommand`: copy `init-firewall.sh` to a root-owned `/usr/local/sbin/init-firewall.sh` outside the bind-mounted workspace while the feature's broad sudo grant is still active, then narrow `sudo` down to NOPASSWD on that one frozen executable file only. The tradeoff is that editing the live `init-firewall.sh` to allow a new domain now needs a full **Rebuild Container**, not just a restart, since the frozen copy is what actually runs.

Claude has it's own way to limit it's own execution too using `.claude/settings.json`. We've configured this on top to deny any `Bash(sudo *)` and `Bash(su *)` commands, so in normal mode Claude won't even attempt the command. But `--dangerously-skip-permissions` does exactly what its name says: it bypasses every permission rule, deny rules included. So that file is a speed bump for the default mode, not something to lean on once the safety's off. The frozen-script sudoers restriction is the one that locks it down regardless, because it's enforced by the OS, not by Claude Code.

## Gap in the firewall

One thing I noticed was that `api.github.com/meta`'s ip ranges aren't scoped to the API. They cover GitHub's whole edge network, which includes GitHub Pages in some cases. For example, this website, [westernwilson.com](https://westernwilson.com), runs on GitHub Pages. So with the firewall up and supposedly restricting the agent to an approved set of domains, I could still reach my own site. And by the same logic, any other `*.github.io` page, or anything hosted there by someone with worse intentions. A page on `*.github.io` could potentially hold a payload hosted somewhere else entirely, and the firewall would wave it through without ever knowing the difference.

I see three ways to close that off:

- Proxy the traffic and filter on hostname instead of IP. Cleanest in theory, but Encrypted Client Hello can still hide the hostname from anything sitting.
- Drop `*.github.io` from the allowlist entirely. Unfortunately this also takes `raw.githubusercontent.com` out too since they share the same ip ranges, but if that's not something the container needs, it's a fine trade.
- Accept the risk and move on.

I haven't picked one yet, for now I'm sitting with the risk while I think about which tradeoff is actually worth it.

## Logging in to Claude

Logging in had its own gotcha. In VS Code there is a big orange "use your subscription" button that opens a browser and waits for a callback to `localhost`, which never makes it back into the container and just hangs. The fix is to skip the button, open a terminal inside the container and run `claude`, which kicks off the same browser flow but resolves the callback correctly. 

We then use `~/.claude`, which is now owned by the `vscode` thanks to the `chown` at the top of `post-create.sh`, so once logged in, we gain stickier login sessions.

In doing the whole login dance from a bare terminal meant that my first real session with Claude Code inside the dev container was just text based interaction with no IDE extension wrapper around it at all. It's an interesting way to work and removes a lot of the UI distraction, but not something I'll rely on fulltime.

## Port forwarding

The other thing that briefly worried me is VS Code forwarded around thirty-two ports the moment the container came up. My first thought was that something in the container was reaching out on its own. It's not, after some searching I found that it's VS Code's automatic port-forwarding scanning the container for anything listening on a port, for example a dev server that you'll want to open in a browser. It's a separate, fairly trigger-happy feature, and apparently a known source of noise; [This GitHub issue](https://github.com/microsoft/vscode-remote-release/issues/10926) describes the exact same "over 20 ports auto-forwarded" behaviour after a setting silently flips from `process` to `hybrid` detection mode.

If you want to see the actual config rather than the excerpts above, it's all in this repo under [.devcontainer/](https://github.com/wjkw1/westernwilson.com/tree/main/.devcontainer). Treat it as a personal setup to extend, not a hardened image to copy verbatim. 

Further reading: Anthropic's [Dev Containers docs](https://code.claude.com/docs/en/devcontainer) and the [VS Code Dev Containers tutorial](https://code.visualstudio.com/docs/devcontainers/tutorial).
