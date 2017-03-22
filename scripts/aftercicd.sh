#!/bin/bash

sudo chmod 755 -R /home/ubuntu/oar-docker/portal/sdp/html/
sudo chown -R www-data:www-data /home/ubuntu/oar-docker/portal/sdp/html/
sudo docker rm -f $(sudo docker ps -a | grep "sdp")
sudo docker rmi -f $(sudo docker images -a | grep "sdp")
sudo docker-compose up -d --build
