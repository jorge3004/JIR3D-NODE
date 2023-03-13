FROM node:alpine as base
WORKDIR /home/node/app
ENV PATH /home/node/app/node_modules/.bin:$PATH
COPY --chown=node:node ./package*.json .
ENV DEBUG=nodejs-docker-express:*
ENV DOCKER_BUILDKIT: 1

FROM base as prod
ENV NODE_ENV=production
RUN npm ci
CMD ["node", "app.js"]

FROM base as dev
ENV NODE_ENV=development
COPY --chown=node:node . .
RUN npm i -g nodemon && npm i
CMD ["npm", "start"]
