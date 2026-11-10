#!/bin/sh
# Publishes only the browser files. Server code and scripts stay out of the website.
set -e
rm -rf dist
mkdir -p dist
cp index.html tech-stack.html receipt.html app.js styles.css _headers dist/
