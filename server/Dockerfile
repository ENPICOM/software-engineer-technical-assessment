FROM node:16-slim

ARG DEVELOPMENT

WORKDIR /server

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD if [[ -z "$DEVELOPMENT"]]; then yarn start; else yarn prod; fi