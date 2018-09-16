#!/bin/bash

aws s3 sync --delete ./content/images s3://mtbva-ghost/content/images  --exclude '*.DS_Store'
aws cloudfront create-invalidation --distribution-id E370H18O1A8QJQ  --paths '/content/images*';
