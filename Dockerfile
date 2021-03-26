FROM node:14.16.0-alpine3.13

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY ./ ./

RUN yarn build
EXPOSE 8080

CMD ["node", "build/main.js"]