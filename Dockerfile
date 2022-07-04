FROM node:14-alpine

# Create app directory
ENV HOME=/usr/src/backend

# copy all files
COPY . $HOME
WORKDIR $HOME

RUN yarn install
RUN yarn build
