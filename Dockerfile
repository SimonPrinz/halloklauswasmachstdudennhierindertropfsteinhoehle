FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN apk update && apk add --no-cache python3
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
ENV PORT 8080
EXPOSE 8080
CMD ["npm", "run", "start"]
