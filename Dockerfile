FROM node:14.17.0-alpine

ENV PRODUCTION=true

RUN apk update && apk add --no-cache chromium chromium-chromedriver

WORKDIR /bots

COPY . .

RUN yarn
RUN chmod +x loop-script.sh

ENTRYPOINT /bots/loop-script.sh
