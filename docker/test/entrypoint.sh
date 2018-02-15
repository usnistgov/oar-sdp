#! /bin/bash 
#
#
set -e

[ "$DEVUID" == "" ] && {
    echo "DEVUID env var not set"
    false
}
[ `id -un` == "root" ] && exec gosu $DEVUID $0 "$@"

[ -f "$DOCKERDIR/env.sh" ] && . env.sh

function installreqs {
    echo '+' bash $DOCKERDIR/build/installreqs.sh
    bash $DOCKERDIR/build/installprereqs.sh
}

function build {
    echo '+' bash $DOCKERDIR/build/build.sh
    bash $DOCKERDIR/build/build.sh
}

function test {
    echo '+' bash $DOCKERDIR/test/test.sh
    bash $DOCKERDIR/test/test.sh
}

if echo "$@" | grep -qsw build; then
    build
elif echo "$@" | grep -qsw install; then
    installreqs
fi

if echo "$@" | grep -qsw test; then
    test
fi

if echo "$@" | grep -qsw shell; then
    exec /bin/bash
fi
