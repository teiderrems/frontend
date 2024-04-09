FROM ubuntu:latest

WORKDIR /app

RUN apt update -y
RUN apt install curl -y
RUN curl -o /usr/local/bin/n https://raw.githubusercontent.com/visionmedia/n/master/bin/n
RUN chmod +x /usr/local/bin/n
RUN n stable

COPY *.json ./
RUN npm install -g npm@10.5.1
RUN npm i

COPY . ./

CMD [ "npm","run","dev" ]