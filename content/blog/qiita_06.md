---
date: 2020-03-22T00:00:00.000Z
title: Vue.jsでぐるなびAPIからデータを取得する
---

# 環境

macOS Catalina 10.15.3

vue 3.0.1

# vue-cli でプロジェクトを作成

ターミナルで以下のコマンドを叩く

```
$ vue crate my-project
```

preset は Babel, Router, Vuex, Linter, Formatter, Unit Testing を選択しています

作成できたら、一度動作確認

```
$ cd my-project
$ npm run serve
```

これで `localhost:8080` に接続すると、以下の画面が表示されるはずです

![image.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F33095%2F5294d835-dd18-a6b5-eb08-dc35b307f632.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ec61fa3bb3017fbff6541eda7ed513e4)

# ぐるなび API のアクセスキーを取得

ぐるなび API を使用するにはアクセスキーが必要になるので、以下のサイトから取得してください。

[ぐるなび Web Service](https://api.gnavi.co.jp/api/)

# ぐるなび API からデータを取得

まず `/src` の直下に `api` というディレクトリを作成します。
この中に `gnavi.js` というファイルを作成し、この中にぐるなび API からデータを取得する関数を定義します。

```
my-project
  └─ src/
      └─ api/
          └─ gnavi.js
```

単一ファイルに直接メソッドを定義することもできますが、分けた方が保守性が高くなることやコードの重複を減らすことができます。

データの取得には、axios を使用して取得するため、インストールしていない方は以下のコマンドを叩いてください。

```
$ npm install --save axios
```

では、ぐるなび API からデータを取得していきます。

```js:title=gnavi.js
import axios from 'axios'

export default {
  searchShops(shopName) {
    // Promiseを返す
      return new Promise((resolve, reject) => {
        axios
          .get("https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=<ぐるなびAPIから取得したアクセスキー>", {
            // 店名検索
            params: {
              name: shopName
            })
            // 検索結果をresolve
            .then(shops => {
              resolve(shops.data.rest);
            })
            // エラーハンドリング
            .catch(error => {
              const errorStatus = error.response.status;

              switch (errorStatus) {
                case 400:
                  reject("不正なパラメータが指定されました");
                  break;
                case 401:
                  reject("不正なアクセスです");
                  break;
                case 404:
                  reject("お店が見つかりませんでした");
                  break;
                case 405:
                  reject("不正なアクセスです");
                  break;
                case 429:
                  reject("リクエスト回数上限超過");
                  break;
                case 500:
                  reject("処理中にエラーが発生しました");
                  break;
                default:
                  reject("不明なエラーです");
                  break;
              }
          });
      })
   }
}
```

これでぐるなび API からデータを取得することができます。これから、このデータを表示するために `src/components/HelloWorld.vue` を書き直します。

```vue:title=HelloWorld.vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="10" sm="8" md="6" lg="4">
        <v-text-field label="店名" v-model="shopName" />
      </v-col>
      <v-col cols="2">
        <v-btn @click="loadShops" :loading="loading">検索</v-btn>
      </v-col>
    </v-row>
    <v-alert v-if="error_msg" type="error">{{ error_msg }}</v-alert>
    <v-row v-if="shops">
      <v-col cols="12" xs="12" sm="6" md="4" lg="3" v-for="(shop, index) in shops" :key="index">
        <v-card>
          <v-img :src="shop.image_url.shop_image1" />
          <v-card-title>{{ shop.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gnavi from "@/api/gnavi.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      shopName: null,
      shops: null,
      error_msg: null,
      loading: false
    };
  },
  methods: {
    loadShops() {
      this.shops = null;
      this.error_msg = null;
      this.loading = true;

      gnavi.searchShops(this.shopName)
        .then(res => {
          this.shops = res;
        })
        .catch(err => {
          this.error_msg = err;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
```

デザインを簡単に整えるために vuetify を使用しています。特に今回の内容とは、関係ないので導入などは省略します。

実行すると、こんな感じになります。

最初の画面
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/974c37fc-6cf4-c82e-d328-ead5b7da2967.png)

やまやと入力して検索ボタンを押すと
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/b7af6ef0-578e-1521-85ab-5ebf69ea5bc1.png)

検索結果が 0 件の場合
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/4ddbe49e-240d-d813-335a-dcea288337f1.png)

# まとめ

今回は、ぐるなび API からデータを取得しました。Vue.js や Promise などの説明を省いたので、Vue.js や JavaScript に触れたことがない方は、わからないところがあったかもしれません。ただ、今回のコードをコピペすれば、とりあえず動くと思うので（vuetify をインストールすれば）、いろいろ試して見てください！
