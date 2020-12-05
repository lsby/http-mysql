FROM node:12
ADD . /code
WORKDIR /code
ENV HOME=/code
RUN bash /code/docker/run.sh
CMD bash /code/docker/cmd.sh
