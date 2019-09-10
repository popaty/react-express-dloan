FROM node:12-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . usr/src/app/

RUN npm install
RUN npm install request --save
RUN npm install express --save

COPY ./ /usr/src/app/

CMD ["npm","start"]
