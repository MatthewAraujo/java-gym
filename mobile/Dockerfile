FROM node:18

RUN apt-get update && \
    apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8081

CMD ["yarn", "web"]
