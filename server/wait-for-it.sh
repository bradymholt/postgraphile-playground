#!/bin/sh

USAGE="
Usage:
  wait-for-it.sh host port command

Waits for a TCP connection to be available and then executates command
"

if [ $# -eq 0 ]; then
  echo $USAGE
  exit 1
fi

while ! nc -z $1 $2; do
  echo "Waiting for $1 port $2 ..."
  sleep 1
done;

eval $3