FROM node:18 as builder

WORKDIR /build

COPY package*.json /build/
RUN npm install --legacy-peer-deps
COPY . .
RUN  npm run build

 
# production

FROM node:18 as production
WORKDIR /app

COPY --from=builder /build/.next/ /app/.next/
EXPOSE 3000
COPY package*.json .
 
 RUN npm install --legacy-peer-deps
 CMD [ "npm","run","start" ]
 
 