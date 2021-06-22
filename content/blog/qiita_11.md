---
date: 2020-11-05T00:00:00.000Z
title: Serverless FrameworkでLINE Botを作ってみた！
---
# Serverless Framework とは
![https___camo.githubusercontent.jpeg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/d1dec5fc-f941-c194-85f1-3d2c04dd7060.jpeg)

[Serverless Framework](https://www.serverless.com/)は FaaS(Function as a Service)やクラウドの DB,Storage でアプリケーションを構成するためのフレームワークです。AWS 以外にも GCP, Azure にも対応しています。

導入方法などは、[こちらの記事](https://qiita.com/horike37/items/b295a91908fcfd4033a2)を参考にしてください。

# 注意事項
- コマンドは Mac を想定しているので Windows の方は、設定方法が異なると思います。
- AWS のアカウントを持っていないと、できません。
- Lambda や API Gateway の設定を簡単に出来過ぎてしまうため、初めて触る方には、あまり理解できないかと思います。

# LINE Bot を作成
[LINE Developers](https://developers.line.biz/ja/)で LINE Bot を作成します。

ログインしたら、画面下の作成をクリックします。
![スクリーンショット 2020-11-04 12.49.01.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/f461f459-a11e-ff1b-92ea-84e1005f82c3.png)

そうすると、プロバイダー名を入力する画面が表示されるので、好きな名前を入力します。
![スクリーンショット 2020-11-04 12.53.55.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/86c20ebf-6e0f-a011-97b1-eef8bc9de472.png)

これでプロバイダーを作成できました。

次にチャネル(LINE Bot)を作成します。今回はおうむ返しする LINE Bot を作成するので Messaging API を選択します。

![スクリーンショット 2020-11-04 12.55.23.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/30fd4b49-65a0-2d7d-485e-8720121ecd47.png)

LINE Bot のアイコンや名前を入力する画面が出てくるので、入力します。

![スクリーンショット 2020-11-04 12.59.58.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/df3d3189-7566-7eb5-39aa-d6a51c938af6.png)

これで LINE Bot の作成は終了です。

# システム構成
今回作成するシステムは、ユーザーが LINE Bot にメッセージを送信すると、Webhook で Lambda の関数が実行されるという感じです。

赤く囲っているところを Serverless Framework で実装します。

![スクリーンショット 2020-11-04 13.08.13.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/313c3908-04b1-1c2c-39d8-e79db46840ab.png)

# AWS のアカウントを PC に関連付ける
AWS-CLI を利用して PC に AWS の情報を設定しておきます。

[この記事](https://qiita.com/reflet/items/e4225435fe692663b705)を参考に

# Let's Serverless
Serverless Framework を PC に導入したら、ターミナルで作業ディレクトリに移動して、以下のコマンドを実行します。

--template オプションで指定しているのは、Lambda で使用するプログラミング言語で、--path オプションで指定しているのは、プロジェクト名とプロジェクトの配置場所です。適宜変更してください。

```
$ serverless create --template aws-python3 --path line-bot
```

コマンドを実行すると以下のディレクトリ構成でプロジェクトが作成されると思います。
```
line-bot
    ├ .gitignore
    ├ handler.py
    └ serverless.yml
```

# serverless.yml を書き換える
serverless.yml を以下に書き換えます。
```serverless.yml
service: line-bot
frameworkVersion: '2'

provider:
  name: aws
  runtime: python3.8
  region: ap-northeast-1 # 東京リージョンを指定

# Lambda関数の設定
functions:
  callback:
    handler: handler.callback
    
    # API Gatewayの設定
    events:
      - http:
          path: callback
          method: post
```

これで、API Gateway と Lambda の設定が終わりです。簡単すぎますね...

# Lambda 関数を実装
次に Lambda が実行する関数を実装します。

## Python の仮想環境を作成
Python なので、まず仮想環境を作ります。自分は、venv で仮想環境を作りますが、conda や virtualenv で作る方もいると思うので、そこは適宜変更してください。

```
$ python3 -m venv line-bot
```

これを実行すると、line-bot というディレクトリが生成されると思います。

```
line-bot
    ├ line-bot/ <-- 仮想環境用ディレクトリ
    ├ .gitignore
    ├ handler.py
    └ serverless.yml
```

生成されたら、以下のコマンドで activate してください。

```
$ source line-bot/bin/activate
```

## LINE Bot に使用するライブラリ
LINE Bot の操作には、line-bot-sdk というライブラリを使用します。

```
$ pip3 install line-bot-sdk
```

## handler.py に実装
これで準備は完了なので、実際にコードを書きます。

```handler.py
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage, ImageMessage
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot import (
    LineBotApi, WebhookHandler
)
import os

access_token = os.environ['LINE_CHANNEL_ACCESS_TOKEN'] // Lambdaの環境変数から取得
secret_key = os.environ['LINE_CHANNEL_SECRET'] // Lambdaの環境変数から取得

line_bot_api = LineBotApi(access_token)
handler = WebhookHandler(secret_key)

// LINE BotのWebhookで実行される関数
def callback(event, context):
    try:
        signature = event["headers"]["x-line-signature"]
        event_body = event["body"]
        handler.handle(event_body, signature)
    except InvalidSignatureError as e:
        logger.error(e)
        return {"statusCode": 403, "body": "Invalid signature. Please check your channel access token/channel secret."}
    except Exception as e:
        logger.error(e)
        return {"statusCode": 500, "body": "exception error"}
    return {"statusCode": 200, "body": "request OK"}

// おうむ返しをする関数
@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=event.message.text)
    )
```

これで、Lambda 関数の実装は終了です。

# requirements.txt を出力
Lambda の Python で使用するライブラリのリストを出力します。activate した状態で以下のコマンドを実行します。

```
$ pip3 freeze > requirements.txt
```

requirements.txt に記載されているライブラリをデプロイしたときに、Lambda にインストールしてもらうために Serverless Framework に plugin を追加します。

```
$ npm install --save serverless-python-requirements
```

これでローカルで使用しているライブラリが Lambda でも利用できるようになります。

# ひとまずデプロイ
ここまで来たら、一回デプロイをして見ましょう。以下のコマンドでデプロイできます。

sls は、serverless の短縮形です。
```
$ sls deploy
```

これを実行したら、AWS のコンソール画面にいき、東京リージョンの Lambda を見にいきましょう。すると、実際にデプロイされていることが分かると思います。

# LINE Bot のアクセストークンとシークレットキーを見にいく
実装した Lambda 関数を実行するためには、LINE Bot のアクセストークンとシークレットキーが必要になるので、LINE Developers のコンソール画面で見ます。

アクセストークンは、Messaging API 設定の下の方にあります。
![スクリーンショット 2020-11-04 14.40.37.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/69348b9f-be68-dcb8-f5f6-10ff01e5e6d4.png)

シークレットキーは、チャネル基本設定の下の方にあります。
![スクリーンショット 2020-11-04 14.38.04.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/afef6ead-488f-acfb-6c6b-8e00322e1af8.png)

# Lambda に環境変数を設定
上記で見た値を Lambda の環境変数にセットします。この画面の少し下に、環境変数を設定できるところがあるので、このような形で保存します。

|キー |値
|---|---
|LINE_CHANNEL_ACCESS_TOKEN |✖️✖️✖️✖️✖️✖️
|LINE_CHANNEL_SECRET |✖️✖️✖️✖️✖️✖️ |

![スクリーンショット 2020-11-04 14.30.44.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/a7913144-fc8a-4e0a-512d-ef15a273912d.png)

# API Gateway の URL を見る
以下のところをクリックすると、API Gateway から発行されている URL を確認できるので、見ておきましょう。 

![スクリーンショット 2020-11-04 14.30.44.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/1489d893-a4a8-da13-bca8-12df7d3e3f8a.png)

# LINE Bot の Webhook に Lambda 関数の URL を設定
LINE Bot の Messaging API 設定の画面の Webhook に API Gateway の URL を入力します。

![スクリーンショット 2020-11-04 14.48.12.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/972b42ac-56f8-a1a9-3a4a-407184d99f2b.png)

入力後、検証ボタンをクリックして、成功画面が表示されたら、終了です。LINE Bot の QR コードが上の方に表示されていると思うのうで、そこから友達追加をすれば、おうむ返し Bot で遊べると思います。

# もしも、詰まったら
上記の検証をクリックして、レスポンスエラーが表示されたら、Lambda 関数でエラーが出ていると思うので、以下のモニタリングのところから

![スクリーンショット 2020-11-04 14.28.54.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/b6572260-e3d2-f67d-ba19-1204cd56f24e.png)

この「CloudWatch のログを表示」をクリックすると、Lambda 関数のログを見ることができるので、それを見てデバッグをして見てください。

![スクリーンショット 2020-11-04 15.03.52.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/10ff2a54-d957-3293-68ed-df150f09f39d.png)