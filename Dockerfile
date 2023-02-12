FROM node
# FROM node:alpine
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
WORKDIR /app
# WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package.json .
COPY package*.json .

RUN npm install
RUN npm i -g nodemon
# RUN apk update && apk add nodejs && npm i -g nodemon
# RUN npm install -g nodemon
# RUN npm install nodemon
COPY . .
# If you are building your code for production
# RUN npm ci --only=production
CMD ["npm", "start"]