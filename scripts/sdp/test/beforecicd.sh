#!/bin/bash

sudo rm -r /opt/data/backup/sdp/*
sudo cp -r /home/ubuntu/oar-docker/apps/sdp/html /opt/data/backup/sdp/
sudo rm -r /home/ubuntu/oar-docker/apps/sdp/html/*
