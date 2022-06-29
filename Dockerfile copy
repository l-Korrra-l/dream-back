FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY ./prisma/schema.prisma ./prisma/schema.prisma
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 7000
CMD [ "npm", "run", "start:migrate:prod" ]