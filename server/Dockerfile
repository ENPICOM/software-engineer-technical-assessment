FROM node:16-slim

WORKDIR /server

COPY package*.json ./

RUN npm ci

COPY . .

CMD npm start