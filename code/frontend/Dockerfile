# Build environment
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
