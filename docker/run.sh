#! /bin/bash
#
prog=`basename $0`
execdir=`dirname $0`
[ "$execdir" = "" -o "$execdir" = "." ] && execdir=$PWD
export CODEDIR=`(cd $execdir/.. > /dev/null 2>&1; pwd)`
export DOCKERDIR=$execdir

function usage {
    cat <<EOF

$prog - build and optionally test the software in this repo

SYNOPSIS
  $prog [-d|--docker-build] [build|test|install|shell ...]

ARGS
  build     build the software
  test      build the software and run the unit tests
  install   just install the prerequisites (use with shell)
  shell     start a shell in the docker container used to build and test

OPTIONS
  -d        build the required docker containers first
EOF
}

set -e

doinstall=
dodockbuild=
ops=
while [ "$1" != "" ]; do
    case "$1" in
        shell|build|install|test)
            ops="$ops $1"
            ;;
        -d|--docker-build)
            dodockbuild=1
            ;;
        -h|--help)
            usage
            exit
            ;;
        -*)
            echo "${prog}: unsupported option:" $1
            false
            ;;
        *)
            echo "${prog}: unsupported operation:" $1
            false
            ;;
    esac
    shift
done

ti=
(echo "$ops" | grep -qs shell) && ti="-ti"

testopts="--cap-add SYS_ADMIN"
volopt="-v ${CODEDIR}:/home/build"
build_script=$CODEDIR/docker/build/build.sh

if echo "$ops" | egrep -qsw 'test|shell'; then
    [ -n "$dodockbuild" ] && $execdir/dockbuild test

    echo '+' docker run $ti --rm $volopt $testopts oarsdp/test "$ops"
    docker run $ti --rm $volopt $testopts oarsdp/test "$ops"
else
    # build only
    [ -n "$dodockbuild" ] && $execdir/dockbuild build

    echo '+' docker run --rm $volopt oarsdp/build
    docker run --rm $volopt oarsdp/build
fi

