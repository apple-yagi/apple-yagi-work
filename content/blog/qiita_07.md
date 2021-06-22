---
date: 2020-04-11T00:00:00.000Z
title: Node.jsとMongoDBの環境をDockerで構築
---

# はじめに
Node.js と MongoDB の組み合わせの Docker 環境をネットで調べると、ちゃんと動くものがなかったので、自分で作成しました。

# 環境構成
Web フレームワークは Node.js、データベースは MongoDB を使用します。また、Nginx のリバースプロキシを用いて、Node.js に接続できる環境にしています。

# ディレクトリ構成
```
my-project
  |-- nginx
  | └ site.conf
  |-- server
  | ├ Dockerfile
  | ├ package.json
  | ├ package-lock.json
  | └ app.js
  └-- docker-compose.yml
```

## nginx
site.conf には Nginx のリバースプロキシの設定を書きます。

```site.conf
server {
  listen 80;
  server_name localhost;
  error_log /var/log/nginx/error.log;
  access_log /var/log/nginx/access.log;
  root /app;

  location / {
    # リバースプロキシ設定
    proxy_pass http://server:8080/;
  }
}
```

## server
server 内の Dockerfile には、Node.js の環境設定を書きます。(以下のファイル名の末尾のコンマは無視してください)

```Dockerfile
FROM node:alpine

# ワーキングディレクトリを作成
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
COPY package*.json ./ # package-lock.jsonもコピーするために*（ワイルドカード）を使用しています
RUN npm install

# アプリケーションのソースをバンドルする
COPY . .

# アプリケーションを起動
CMD [ "node", "app.js" ]
```

package.json は手書きするか npm init を使用して作成します。以下に、サンプルを記述しておきます。
mongoose をインストールしておかないと、MongoDB との接続を確認できないので、注意してください。

```package.json
{
  "name": "server",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "main": "app.js",
  "author": "sample",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.9.7"
  }
}
```

app.js は手書きします。
``` app.js
// モジュールをロード
const express = require("express"),
      mongoose = require("mongoose");

// ポートとホストを設定
const PORT = 8080;
const HOST = "0.0.0.0";

// expressを使用
const app = express();

// データベース接続
mongoose.connect(
  "mongodb://mongo/test",
  // testというDBに接続しています
  { 
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

const db = mongoose.connection;
db.once("opne", () => {
  // 接続できると以下のログが出力されます。
  // 接続できない場合はエラーが出力されます。
  console.log("Success MongoDB connected!!");
});

// 指定されたポートを監視
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

## docker-compose.yml
```docker-compose.yml
version: '3'

services:
  server:
    build: ./server
    container_name: "server"
    ports: 
      - 8080:8080
    links:
      - mongo
    depends_on:
      - mongo
    volumes:
      - ./server:/server
      - /home/app/nodeapp/node_modules

  nginx:
    image: nginx:latest
    container_name: "nginx"
    ports:
      - "80:80"
    depends_on:
      - server
    volumes:
      - ./server:/server
      - ./nginx/site.conf:/etc/nginx/conf.d/default.conf:cached

  mongo:
    image: mongo
    container_name: "mongo"
    command: mongod
    ports:
      - 27017:27017
    volumes:
      - mongo-data:/data/db

  mongo-data:
    image: busybox

volumes:
  mongo-data:
```

# MongoDB 内のデータの永続化
docker-compose.yml 内に書いている mongo-data の image: busybox でデータの永続化をしています。これによって、docker コンテナをダウンさせても、次回立ち上げ時にデータを維持することができます。
