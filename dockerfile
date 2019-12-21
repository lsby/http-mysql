FROM node:alpine

VOLUME ["/root/code","/usr/local/lib/node_modules","/usr/local/bin"]
ADD . /root/code
WORKDIR /root/code

CMD sh /root/code/docker/run.sh
