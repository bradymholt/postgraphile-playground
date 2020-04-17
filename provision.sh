#!/bin/bash

set -e

# Configure SSH so that remote Docker commands will not hit a limit
MAX_SESSION_CONFIG="MaxSessions 100"
if ! grep -q -E "^$MAX_SESSION_CONFIG" /etc/ssh/sshd_config; then
  echo "$MAX_SESSION_CONFIG" >> /etc/ssh/sshd_config
  systemctl restart sshd
fi

# Install Docker
if ! which docker > /dev/null; then
  sudo apt update
  sudo apt -y install apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
  sudo apt update
  apt-cache policy docker-ce
  sudo apt -y install docker-ce
fi