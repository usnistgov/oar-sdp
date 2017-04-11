#!/bin/bash

sudo rm -r /opt/data/backup/oar-sdp/*
sudo cp -r /home/ubuntu/oar-docker/portal/sdp/html /opt/data/backup/oar-sdp/
sudo rm -r /home/ubuntu/oar-docker/portal/sdp/html/*
