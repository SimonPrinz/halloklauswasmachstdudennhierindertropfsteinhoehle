# builder instance
FROM node:lts-alpine AS builder
WORKDIR /app

# install python and build-essentials for gyp
RUN apk update && \
    apk add --no-cache python2 g++ make

# install all dependencies
COPY package*.json ./
RUN npm install

# copy source and build
COPY . .
RUN npm run build


# final instance
FROM node:lts-alpine
WORKDIR /app

# install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# copy build from builder
COPY --from=builder /app/dist ./dist

# define default port and expose it
ENV PORT 8080
EXPOSE 8080

# set opencontainer labels
LABEL org.opencontainers.image.title halloklauswasmachstdudennhierindertropfsteinhoehle
LABEL org.opencontainers.image.description Hallo Klaus, was machst Du denn hier in der Tropfsteinhöhle? - Ja, hallo Erwin...
LABEL org.opencontainers.image.url https://halloklauswasmachstdudennhierindertropfsteinhoehle.de/
LABEL org.opencontainers.image.source https://github.com/SimonPrinz/halloklauswasmachstdudennhierindertropfsteinhoehle

# run start script
CMD ["npm", "run", "start"]