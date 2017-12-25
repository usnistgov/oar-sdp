#! /bin/bash
#
prog=`basename $0`
execdir=`dirname $0`
[ "$execdir" = "" -o "$execdir" = "." ] && execdir=$PWD

function usage {
    cat <<EOF

$prog - build the docker containers used to build and test the 
               software in this repo

SYNOPSIS
  $prog [build|test]

ARGS
  build     build the docker container(s) used to build the software (default)
  test      build the docker container(s) used to test the software 

EOF
}

if echo "$@" | egrep -qswe "-h|--help"; then
    usage
    exit
fi

op=$1
[ "$op" == "" ] && op=build

devuid=`id -u`
devuser=$USER
build_args="--build-arg=devuid=$devuid --build-arg=devuser=$devuser"

set -ex

docker build -t oarsdp/build $build_args $execdir/build
[ "$op" != "build" ] && docker build -t oarsdp/test $execdir/test
echo All needed images successfully built
