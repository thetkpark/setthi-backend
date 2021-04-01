FROM node:14.16.0-alpine3.13 AS build-stage

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY ./ ./

RUN npx prisma generate

RUN yarn build


FROM node:14.16.0-alpine3.13 as prod-stage
WORKDIR /app
COPY --from=build-stage /app/package.json ./
COPY --from=build-stage /app/yarn.lock ./

RUN yarn --prod

COPY --from=build-stage /app/prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate

COPY --from=build-stage /app/dist/ ./dist/

EXPOSE 3000
CMD ["yarn", "start:prod"]