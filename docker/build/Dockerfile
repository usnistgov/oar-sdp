##########################################
#
# Build container for angular components
#
# The purpose of this Docker container is produce a distribution
# bundle that can be added into the deployment container.  This
# container should build the code in an environment that sufficiently
# matches the target operational environment. 
#
##########################################

# The parent should be an ancestor image of the operational container
# 
FROM debian:bullseye-slim

# RUN sed -e '/stretch-updates/ s/^deb/#deb/' /etc/apt/sources.list \
#    > /tmp/sources.list && mv /tmp/sources.list /etc/apt/sources.list
RUN apt-get update && \
    apt-get install -y --no-install-recommends zip wget ca-certificates git \
                                               xz-utils gnupg python3       \
                                               build-essential

COPY cacerts/README.md cacerts/*.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV NODE_EXTRA_CA_CERTS /etc/ssl/certs/ca-certificates.crt

COPY node-*-sha256.txt /tmp/
RUN arch=`dpkg --print-architecture` && \
    { [ "$arch" != "amd64" ] || arch="x64"; } && echo $arch > /etc/plat-arch
RUN cd /tmp && arch=`cat /etc/plat-arch`  \
            && wget https://nodejs.org/dist/v16.17.1/node-v16.17.1-linux-${arch}.tar.xz \
            && sha256sum -c node-${arch}-sha256.txt
RUN cd /usr/local && arch=`cat /etc/plat-arch`                       \
                  && tar xJf /tmp/node-v16.17.1-linux-${arch}.tar.xz \
                  && ln -s node-v16.17.1-linux-${arch} node          \
                  && cd bin                                          \
                  && ln -s ../node/bin/node node                     \
                  && ln -s ../node/bin/npm  npm                      \
                  && ln -s ../node/bin/npx  npx            

ENV GOSU_VERSION 1.14
RUN set -ex; \
    arch="$(dpkg --print-architecture | awk -F- '{ print $NF }')"; \
    wget -O /usr/local/bin/gosu \
   "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$arch"; \
    wget -O /usr/local/bin/gosu.asc \
"https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$arch.asc";\
    export GNUPGHOME="$(mktemp -d)"; \
    gpg --batch --keyserver hkps://keys.openpgp.org \
        --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4; \
    gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu; \
    rm -r /usr/local/bin/gosu.asc || true; \
    chmod +x /usr/local/bin/gosu; \
    gosu nobody true

# Create the user that build/test operations should run as.  Normally,
# this is set to match identity information of the host user that is
# launching the container.
#
RUN sed --in-place -e '/CREATE_MAIL_SPOOL/ s/=yes/=no/' /etc/default/useradd
ARG devuser=developer
ARG devuid=1000
RUN grep -qs :$devuid: /etc/group || \
    groupadd --gid $devuid $devuser
RUN grep -Pqs ":$devuid:\d+:" /etc/passwd || \
    useradd -m --comment "OAR Developer" --shell /bin/bash \
            --gid $devuid --uid $devuid $devuser


COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod a+rx /usr/local/bin/entrypoint.sh

VOLUME /dev/oar-sdp
VOLUME /app/dist

RUN mkdir -p /home/build /home/dist
WORKDIR /home/build

ENV CODEDIR /home/build
ENV DOCKERDIR /home/build/docker
ENV DEVUID $devuid

ENTRYPOINT ["docker/build/entrypoint.sh"]
