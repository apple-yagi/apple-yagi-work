---
date: 2021-06-28T14:37:11.703Z
title: Serverless Frameworkで🦜返しするLINE Botを作る
description: Serverless Frameworkを用いて、AWSのLambdaにLINE Bot用のAPIサーバーを作り、おうむ返しBotを作成する。
ogp: /content/blog/serverless.jpeg
---
# Serverless Frameworkとは

![Serverless Framework](/content/blog/serverless500-260.jpeg "Serverless Framework")

[Serverless Framework](https://www.serverless.com/) はFaaS(Function as a Service)やクラウドのDB,Storageでアプリケーションを構成するためのフレームワークです。AWS以外にもGCP, Azureにも対応しています。\
導入方法などは、[こちらの記事](https://qiita.com/horike37/items/b295a91908fcfd4033a2)を参考にしてください。

# 注意事項

* コマンドは Mac を想定しているので Windows の方は、設定方法が若干異なると思います。
* AWS のアカウントを持っていないとできないので、[こちら](https://aws.amazon.com/jp/)から登録してください。
* LambdaやAPI Gatewayの設定を簡単にできすぎてしまうため、初めて触る方には、あまり理解できないかと思います。

# LINE Botを作成

[LINE Dvelopers](https://developers.line.biz/ja/)でLINE Botを作成します。\
ログインしたら、画面下の作成をクリックします。

![LINE Developers1](/content/blog/line-developer1.png "LINE Developers1")

そうすると、プロバイダー名を入力する画面が表示されるので、好きな名前を入力します。

![LINE Developers2](/content/blog/line-developer2.png "LINE Developers2")

これでプロバイダーを作成できました。
次にチャネル（LINE Bot）を作成します。\

今回は🦜返しするLINE Botを作成するのでMessaging APIを選択します。

![LINE Developers3](/content/blog/line-developer3.png "LINE Developers3")

LINE Botのアイコンや名前を入力する画面が出てくるので、入力します。

![LINE Developers4](/content/blog/line-developer4.png "LINE Developers4")

これでLINE Botの作成は終了です。

# システム構成

今回作成するシステムは、ユーザーがLINE Botにメッセージを送信すると、WebhookでLambdaの関数が実行されるとういう感じです。\
赤く囲っているところをServerless Frameworkで実装します。

![LINE Bot System Configuration](/content/blog/line-bot-system-configuration.png "LINE Bot System Configuration")

# AWSのアカウントをPCに関連づける
AWS-CLIを利用してPCにAWSの情報を設定しておきます。\
[この記事](https://qiita.com/reflet/items/e4225435fe692663b705)を参考に

# Let's Serverless
Serverless FrameworkをPCに導入したら、ターミナルで作業ディレクトリに移動して、以下のコマンドを実行します。\
--templateオプションで指定しているのは、Lambdaで使用するプログラミング言語で、--pathオプションで指定しているのは、プロジェクト名とプロジェクトを配置するディレクトリ名です。適宜変更してください。

```sh
$ serverless create --template aws-nodejs --path line-bot-oumugaeshi
```

コマンドを実行すると以下のディレクトリ構成でプロジェクトが作成されると思います。