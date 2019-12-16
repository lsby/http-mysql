FROM node:12.13.1

ADD . /code
WORKDIR /code

RUN npm i && npm start
