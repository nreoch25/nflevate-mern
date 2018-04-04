
FROM node:8.1.1

RUN npm install -g yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install --pure-lockfile
COPY . /usr/src/app

EXPOSE 8000
CMD ["yarn", "bs"]
