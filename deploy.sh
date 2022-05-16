#!/bin/bash
npm install
npm run build:demo
docker build -t ngx-angular-time-picker-lib .
sudo docker-compose down || true
sleep 2s
sudo docker-compose up -d
