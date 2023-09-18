FROM node:18-alpine

WORKDIR /api-despesas

COPY package.json .

COPY prisma .

RUN yarn add husky@8.0.3 -g

RUN yarn add typescript@5.0.4 -g

RUN yarn install --dependencies

COPY . .

CMD [ "yarn", "start" ]