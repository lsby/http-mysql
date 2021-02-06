FROM node:14
ADD . /code
WORKDIR /code
ENV HOME=/code
RUN bash /code/docker/run.sh
CMD npm run pm2_start && npm run pm2_log
