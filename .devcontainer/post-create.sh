#!/usr/bin/env bash
set -euo pipefail

echo "Enabling corepack and preparing pnpm..."
corepack enable
corepack prepare pnpm@latest --activate

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

git config --global commit.gpgsign true
git config --global tag.gpgsign true



echo "Setting up zsh aliases..."
cat >> "${HOME}/.zshrc" <<'EOF'

# --- dev container aliases ---
alias k=kubectl
alias t=terraform

# kubectl completion, and make `k` complete like kubectl
source <(kubectl completion zsh)
compdef k=kubectl
EOF
