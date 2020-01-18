FROM node:alpine

ADD . /root/code
WORKDIR /root/code

RUN echo 'build' && \
    # npm install -g cnpm --registry=https://registry.npm.taobao.org && \
    npm i -g pm2  && \
    npm i

CMD sh /root/code/docker/run.sh
