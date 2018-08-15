#!/usr/bin/env bash

echo -e 'running npm install...'
npm install --loglevel=notice
echo -e 'starting development server...'
npm run watch-debug
