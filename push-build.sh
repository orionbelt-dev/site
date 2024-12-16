
#!/usr/bin/env bash

# exit on error
set -o errexit

node ace build --ignore-ts-errors --production --no-assets
cd build
git init
git add .
git commit -m "a commit"
git remote add origin git@github_orion:orionbelt-dev/buildx.git
git config pull.rebase false  # merge
# git config pull.rebase true   # rebase
# git config pull.ff only  # fast-forward only
git pull --depth=1 origin main
git push -u origin main