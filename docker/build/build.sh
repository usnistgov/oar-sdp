#! /bin/bash
#
execdir=`dirname $0`
[ "$execdir" = "" -o "$execdir" = "." ] && execdir=$PWD

set -ex

. $execdir/installprereqs.sh
npm run build.prod.aot -- --app pdr
npm run build.prod.aot -- --app sdp

