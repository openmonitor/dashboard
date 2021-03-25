FROM node:latest

ADD . /dashboard/
WORKDIR /dashboard

RUN npm install
ENTRYPOINT npm run start
