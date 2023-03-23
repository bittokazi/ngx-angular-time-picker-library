FROM node:12-bullseye
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build:demo
EXPOSE 5603
CMD [ "node", "server.js" ]
