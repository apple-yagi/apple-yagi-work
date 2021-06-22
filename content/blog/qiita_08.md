---
date: 2020-06-06T00:00:00.000Z
title: Nuxt.jsにGoogle Analyticsを導入する
---
# はじめに

この[Webアプリケーション](https://increment.site)を作成する際に、Analytics の導入に困ったので解決方法を載せます。また、Firebase-tools の導入やプロジェクトの作成は省略します。

# 方法
~/plugins の下に firebase.js と ga.js を作成します。
```
my-project
  └ plugins/
         ├ firebase.js
         └ ga.js
```

```firebase.js
import firebase from 'firebase/app'
import 'firebase/analytics'

if(!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'プロジェクトのapiKey',
    authDomain: 'プロジェクトのドメイン',
    '以下省略'
  })
}

export default firebase
```

```ga.js
import firebase from './firebase'

export default ({ app }) => {
  if(process.env.NODE_ENV !== 'production') return

  firebase.analytics();
}
```

これを作成した後に、nuxt.config.js に以下を追加します。

```nuxt.config.js
module.exports = {
  '省略'
  plugins: [
    {
      src: '~/plugins/ga.js',
      mode: 'client'
    }
  ],
  '省略'
```
これで Google Analytics が導入できます。

# 最後に少し宣伝
「はじめに」のところでも少し出したのですが、この度 Web アプリケーションを作成しました。初学者の「みんな技術的情報はどこから得ているの？」という疑問を少しでも解決できるようにという思いで作成しました。時間がある方や興味がある方はぜひご覧になってください！