#!/bin/bash

set -v

# Configure SSH so that remote Docker commands will not hit a limit
echo "MaxSessions 100" >> /etc/ssh/sshd_config
systemctl restart sshd

# Install Docker
sudo apt update
sudo apt -y install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt -y install docker-ce