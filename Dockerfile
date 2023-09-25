FROM node:18-alpine

WORKDIR /api-despesas

COPY package.json .

COPY prisma .

RUN yarn install 

COPY . .

CMD [ "yarn", "start" ]