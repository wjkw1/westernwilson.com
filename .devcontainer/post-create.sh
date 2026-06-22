#!/usr/bin/env bash
set -euo pipefail

echo "Setting up Claude Code auth, settings, and session history persistence..."
sudo chown -R vscode:vscode /home/vscode/.claude

echo "Setting up git aliases..."
git config --global user.name "wjkw1"
git config --global user.name 
git config --global user.email "kiaora@westernwilson.com" 
git config --global user.email
git config --global alias.ci commit
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"
git config --global alias.lg "log --oneline --graph --decorate"

git config --global commit.gpgsign false
git config --global tag.gpgsign false



echo "Setting up zsh aliases..."
cat >> "${HOME}/.zshrc" <<'EOF'

# --- dev container aliases ---
alias k=kubectl
alias t=terraform

# kubectl completion, and make `k` complete like kubectl
source <(kubectl completion zsh)
compdef k=kubectl
EOF

echo "Freezing init-firewall.sh outside the workspace mount..."
sudo install -o root -g root -m 0755 \
    "${PWD}/.devcontainer/init-firewall.sh" /usr/local/sbin/init-firewall.sh

echo "Restricting passwordless sudo to the frozen firewall script only..."
sudo tee /etc/sudoers.d/vscode > /dev/null <<'EOF'
vscode ALL=(root) NOPASSWD: /usr/local/sbin/init-firewall.sh
EOF
sudo chmod 0440 /etc/sudoers.d/vscode
sudo visudo -c
