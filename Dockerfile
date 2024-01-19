FROM node:18

WORKDIR /app

COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build && \
    npm prune --production && \
    rm -rf node_modules/.cache

EXPOSE 3000
CMD ["npm", "start"]
