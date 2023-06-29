#!/bin/bash


cd ./spdfjs-src
npm install
npm run build

cd ../
npm install
npm run build
