#!/bin/bash

sudo chmod 755 -R /home/ubuntu/oar-docker/apps/pub-pdr/html/
sudo chown -R www-data:www-data /home/ubuntu/oar-docker/apps/pub-pdr/html/
cd /home/ubuntu/oar-docker/apps/

if [[ $(sudo docker ps -aqf "name=pub-pdr") ]]; then
    sudo docker rm -f $(sudo docker ps -aqf "name=pub-pdr")
fi
if [[ $(sudo docker images pub-pdr -aq) ]]; then
   sudo docker rmi -f $(sudo docker images pub-pdr -aq)
fi

sudo docker-compose rm -f
sudo docker-compose build --no-cache
sudo docker-compose up -d 
