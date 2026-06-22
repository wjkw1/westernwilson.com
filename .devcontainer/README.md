# Dev Container Quick Start

Requires Docker (or Docker Desktop) and the VS Code "Dev Containers" extension.

1. Open this repo in VS Code, then run **Dev Containers: Reopen in Container** from the command palette (`Cmd/Ctrl+Shift+P`).
2. Once it's built, log in to GitHub and Claude:

```zsh
gh auth login

claude auth login
```

GitHub credentials live in the container and are wiped on rebuild. Claude credentials are kept in a mounted volume (`claude-code-config-${devcontainerId}`), so you only need to log in once per project.

For the full walkthrough —including why the orange "use your subscription" button hangs in a container, and the `~/.claude` ownership gotcha if you skip the `postCreateCommand` chown— see [westernwilson.com/reflections/containerising-my-coding-agent](https://westernwilson.com/reflections/containerising-my-coding-agent/).

## Forking this setup

Copying `.devcontainer/` into your own repo? Update the hardcoded git identity (`user.name`/`user.email`) in `post-create.sh`.

## Network

`init-firewall.sh` restricts outbound traffic to an allow-list (GitHub, npm, Anthropic, VS Code, Sentry). Add a domain there if a tool you install needs network access — then **Rebuild Container** to pick up the change (see Sudo section below for why a plain restart isn't enough).

## Sudo

The `vscode` user only gets passwordless `sudo` to run one exact command: `/usr/local/sbin/init-firewall.sh`. That's a root-owned copy of `init-firewall.sh`, frozen there once by `post-create.sh` while the `common-utils` feature's broad default sudo grant is still active (the only point in the container's lifecycle where that's safe). `vscode` can't edit it because it lives outside the bind-mounted workspace. It also can't run raw `iptables`/`ipset`/anything else as root. Everything else, including `sudo iptables -F` directly, needs a password (which doesn't exist for vscode user).

This configuration stops an agent running with `--dangerously-skip-permissions` from disabling the firewall. It can only ever re-run the frozen, known-good script, never tamper with it or escalate further.

`.claude/settings.json` adds a second layer of protection on top, denying `sudo`/`su` at the Claude Code permission level; that layer doesn't apply under `--dangerously-skip-permissions`, which is why the sudoers restriction matters more.
