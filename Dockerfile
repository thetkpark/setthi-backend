FROM node:14.16.0-alpine3.13

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY ./ ./

EXPOSE 3000

CMD ["yarn", "start"]