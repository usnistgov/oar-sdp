#!/bin/bash

sudo chmod 755 -R /home/ubuntu/oar-docker/apps/pub-pdr/html/
sudo chown -R www-data:www-data /home/ubuntu/oar-docker/apps/pub-pdr/html/
cd /home/ubuntu/oar-docker/apps/

if [[ $(sudo docker ps -a | grep "pubpdr") ]]; then
    sudo docker rm -f $(sudo docker ps -a | grep "pubpdr")
fi
if [[ $(sudo docker images -a | grep "pubpdr") ]]; then
   sudo docker rmi -f $(sudo docker images -a | grep "pubpdr")
fi

cd /home/ubuntu/oar-docker/apps/pub-pdr/
sudo docker-compose up -d --build
