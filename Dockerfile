FROM node:alpine as base
WORKDIR /app
COPY package*.json ./
ENV DEBUG=nodejs-docker-express:*

FROM base as production
ENV NODE_ENV=production
RUN npm ci
CMD ["node", "app.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm i -g nodemon && npm i
COPY . .
CMD ["npm", "start"]
