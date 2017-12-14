#! /bin/bash
#
set -e

doinstall=
extra=
op=shell
while [ "$1" != "" ]; do
    case "$1" in
        -i|--install)
            doinstall=$1
            ;;
        *)
            extra="$extra $1"
            ;;
    esac
done

[ -n "$extra" ] && echo "Ignoring extra arguments: $extra"

set -x
[ -n "$doinstall" ] && $DOCKERDIR/build/installprereqs.sh

npm test


