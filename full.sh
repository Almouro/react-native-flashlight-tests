#!/bin/bash

set -e

NEW_ARCH=$1
SCENARIO=$2

# Fetch versions
versions=$(npm show react-native versions --json)

# Find the index of "0.69.10"
index=$(echo "$versions" | jq -r 'index("0.69.9")')

versions=$(echo "$versions" | jq -r ".[$index:][]")

# Override here potentially
# versions=$(echo "$versions" | jq -r '.[] | select(. >= "0.72.0" and . <= "0.72.7")')
# versions="0.70.14 0.71.0-rc.0 0.71.14 0.72.0-rc.0 0.72.7 0.73.0-nightly-20230506-1af868c52 0.74.0-nightly-20231119-9b1f8a81e"

# Use jq to slice array and loop
for version in $versions; do
  echo "Triggering build for $version..."
  curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GH_TOKEN_DISPATCH_ACTION"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/almouro/wip-wip/actions/workflows/build.yaml/dispatches \
  -d "{\"ref\":\"main\", \"inputs\":{\"new_arch\":$NEW_ARCH,\"rn_version\":\"$version\", \"scenario\":\"$SCENARIO\"}}"
done
