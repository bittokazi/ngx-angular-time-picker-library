#!/bin/bash
npm install
npm run build:demo
sudo docker-compose down || true
docker build -t ngx-angular-time-picker-lib .
sleep 2s
sudo docker-compose up -d
