FROM node:16-slim

WORKDIR /client

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD yarn start