#! /bin/bash
#
set -ex

npm cache clean
npm install
npm install gulp
nodejs node_modules/gulp/bin/gulp build.bundle.rxjs

