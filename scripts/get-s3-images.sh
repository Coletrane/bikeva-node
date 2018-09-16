#!/bin/bash

aws s3 sync --delete s3://mtbva-ghost/content/images ./content/images
