FROM node:18.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3330

CMD [ "yarn", "start" ]