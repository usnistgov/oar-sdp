#!/bin/bash

sudo chmod 755 -R /home/ubuntu/oar-docker/apps/sdp/html/
sudo chown -R www-data:www-data /home/ubuntu/oar-docker/apps/sdp/html/
cd /home/ubuntu/oar-docker/apps/

if [[ $(sudo docker ps -aqf "name=sdp") ]]; then
    sudo docker rm -f $(sudo docker ps -aqf "name=sdp")
fi
if [[ $(sudo docker images sdp -aq) ]]; then
   sudo docker rmi -f $(sudo docker images sdp -aq)
fi

sudo ./deploy-dev.sh


