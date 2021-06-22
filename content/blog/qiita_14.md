---
date: 2021-03-08T00:00:00.000Z
title: Firestoreの公式ドキュメントに載っているコードをasync/awaitで書き直してみる
---
# はじめに
Firebase のデータストアの 1 つである Firestore の[公式ドキュメント](https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja)のサンプルコードが全て**Promise チェーン**になっているので、一部のコードを**async/await**で書き直してみます。

# Promise チェーンとは
``` hoge.js
var docRef = db.collection("cities").doc("SF");

docRef.get().then((doc) => {
  if (doc.exists) {
    console.log("Document data:", doc.data());
  } else {
    // doc.data() will be undefined in this case\n console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
```

上記のような **then** で非同期処理の結果を受け取る方法を**Promise チェーン**と呼びます（正式名称かは不明）。

この記述を行うと、連続して非同期処理を行った時にコードの可読性が低下する要因となります。
例えば、非同期処理が 3 連続すると以下のようなコードになります。

```fuga.js
var docRef = db.collection("cities").doc("SF");
var docRef2 = db.collection("cities").doc("LA");
var docRef3 = db.collection("cities").doc("DC");

docRef.get().then((doc) => {
  if (doc.exists) {
    console.log("Document data:", doc.data());
  } else {
    // doc.data() will be undefined in this case\n console.log("No such document!");
    // データがなかった場合、docRef2のデータを取得する
    docRef2.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");

        // データがなかった場合、docRef3のデータを取得する
        docRef3.get().then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        })
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
```

このように連続した**Promise チェーン**はコードのネストが深くなりやすく、可読性が低くなります。

# ドキュメントを取得する
公式ドキュメントのコード

```test.firebase.js
var docRef = db.collection("cities").doc("SF");

docRef.get().then((doc) => {
  if (doc.exists) {
    console.log("Document data:", doc.data());
  } else {
    // doc.data() will be undefined in this case
    console.log(\"No such document!\");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
```

async/await を使用したコード

```refactoring.firebase.js
var docRef = db.collection("cities").doc("SF");

const getDoc = async() => {
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch(error) {
    console.log("Error getting document:", error);
  }
}

// この処理は非同期で実行される
getDoc();
```

3連続した非同期処理を async/await に書き換える

```refactoring.firebase.js
var docRef = db.collection("cities").doc("SF");
var docRef2 = db.collection("cities").doc("LA");
var docRef3 = db.collection("cities").doc("DC");

const getDoc = async() => {
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      console.log("Document data:", doc.data());
      return;
    }
    // doc.data() will be undefined in this case
    console.log("No such document!");

    // データがなかった場合、docRef2のデータを取得する
    const doc2 = await docRef2.get();
    if (doc.exists) {
      console.log("Document data:", doc2.data());
      return;
    }
    // doc.data() will be undefined in this case
    console.log(\"No such document!\");

    // データがなかった場合、docRef3のデータを取得する
    const doc3 = await docRef3.get();
    if (doc.exists) {
      console.log("Document data:", doc3.data());
      return;
    }
    // doc.data() will be undefined in this case
    console.log("No such document!");
  } catch(error) {
    console.log("Error getting document:", error);
  }
}

// この処理は非同期で実行される
getDoc();
```

Promise チェーンが 1 つの場合は、ネストがあまり深くならないので**async/await**の恩恵をあまり感じませんが、複数の処理を実行する時は、ネストが深くなるのを抑えてくれます。

# コレクションから複数のドキュメントを取得する
公式ドキュメントのコード

```test.firebase.js
db.collection("cities").where("capital", "==", true)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, "=>", doc.data());
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
```

async/await を使用したコード

```refactoring.firebase.js
const getDocs = async() => {
  try {
    const querySnapshot = await db.collection("cities").where("capital", "==", true);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, "=>", doc.data());
    })
  } catch(error) {
    console.log("Error getting documents: ", error);
  }
}

// この処理は非同期で実行される
getDocs();
```

# まとめ
Firebase のコードは全て Promise チェーンで記述されているため、何も考えずにコードを書いていくと、ネストが深くなりがちです。**async/await**を使用して、ネストが少ないコードを心がけましょう！
