FROM node:16-slim

WORKDIR /client

COPY package*.json ./

RUN npm ci

COPY . .

CMD npm start