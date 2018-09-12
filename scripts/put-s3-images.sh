#!/bin/bash

aws s3 sync --delete ./content/images s3://mtbva-ghost --cache-control max-age=2629746  --exclude '*.DS_Store'
aws cloudfront create-invalidation --distribution-id E1SHPBQLNFW05Q --paths '/*';