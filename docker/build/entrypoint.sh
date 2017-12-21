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

op=$1
[ "$op" == "" ] && op=build
case "$op" in
    build)
        echo '+' bash $DOCKERDIR/build/build.sh
        bash $DOCKERDIR/build/build.sh
        ;;
    shell)
        exec /bin/bash
        ;;
esac

              
