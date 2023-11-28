#!/bin/bash

set -e
set -x

cd react-native
# Extracting the commit hash
commit_hash=$(git rev-parse HEAD)

# Extracting the commit date in a JavaScript friendly format (ISO 8601) including timezone
commit_date=$(git show -s --format=%cI ${commit_hash})
cd ..

# See https://app.flashlight.dev/projects/c0fd02d4-bfcf-4a27-aef4-edf82bd399f4/test-list
# https://app.flashlight.dev/projects/c0fd02d4-bfcf-4a27-aef4-edf82bd399f4/evolution?testName=pok4col
PROJECT_ID="c0fd02d4-bfcf-4a27-aef4-edf82bd399f4"

curl https://get.flashlight.dev | bash
# For some reason path overriding doesn't work
/home/runner/.flashlight/bin/flashlight cloud --test bisect/start.yaml --duration 10000 --app "${commit_hash}-pok4col.apk" --projectId $PROJECT_ID --tagName $commit_hash --tagDate $commit_date --testName "pok4col"
