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

function build {
    echo '+' $CODEDIR/scripts/makedist
    $CODEDIR/scripts/makedist
}

function test {
    echo '+' $CODEDIR/scripts/testall
    $CODEDIR/scripts/testall
}

if echo "$@" | grep -qsw build; then
    build
fi

if echo "$@" | grep -qsw test; then
    test
fi

if echo "$@" | grep -qsw shell; then
    exec /bin/bash
fi
