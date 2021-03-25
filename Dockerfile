FROM node:latest

ADD dashboard /dashboard/
WORKDIR /dashboard

RUN npm install
ENTRYPOINT["npm", "run"]
