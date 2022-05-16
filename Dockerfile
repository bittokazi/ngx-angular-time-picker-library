FROM node:12-bullseye
WORKDIR /app
COPY ./ ./
EXPOSE 5603
CMD [ "node", "server.js" ]
