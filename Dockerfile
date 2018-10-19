FROM node

RUN mkdir -p /usr/src/node
WORKDIR /usr/src/node

COPY . /usr/src/node


WORKDIR /usr/src/node/website
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
