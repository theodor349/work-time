FROM node:hydrogen-slim
WORKDIR /
COPY public/ /public
COPY src/ /src
COPY package.json /

RUN npm install
CMD ["npm", "start"]