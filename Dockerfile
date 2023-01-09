FROM node:14-alpine
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i

EXPOSE 8000 8000
CMD ["npm", "run", "start"]