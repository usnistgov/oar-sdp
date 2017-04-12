#!/bin/bash

sudo chmod 755 -R /home/ubuntu/oar-docker/apps/sdp/html/
sudo chown -R www-data:www-data /home/ubuntu/oar-docker/apps/sdp/html/
cd /home/ubuntu/oar-docker/apps/

if [[ $(sudo docker ps -a | grep "sdp") ]]; then
    sudo docker rm -f $(sudo docker ps -a | grep "sdp")
fi
if [[ $(sudo docker images -a | grep "sdp") ]]; then
   sudo docker rmi -f $(sudo docker images -a | grep "sdp")
fi

cd /home/ubuntu/oar-docker/apps/sdp/
sudo docker-compose up -d --build
