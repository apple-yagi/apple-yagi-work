---
date: 2020-09-25T00:00:00.000Z
title: Vue ✖️ Firebase Storageで画像保存
---

# はじめに
Vue.js と Firebase の導入については、省いております。ご了承ください。

# 画像投稿機能 Vue.js のコード

### プレビュー付き画像フィールド
``` VImgField.vue
<template>
  <div>
    <v-row v-if="uploadedImage" justify="center" align="center">
      <v-sheet width="300">
        <v-img :src="uploadedImage" />
      </v-sheet>
    </v-row>
    <div v-cloak @drop.prevent="addDropFile" @dragover.prevent>
      <v-row justify="center" align="center">
        <v-col cols="11" sm="8" md="6">
          <v-file-input v-model="file" 
            accept="image/png, image/jpeg, image/jpg, image/bmp"
            prepend-icon="mdi-camera"
            placeholder="画像ファイル(png, jpeg, jpg, bmp)を選択"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, watch } from '@vue/composition-api';

// アップロードを許可する拡張子
const allowExts: string[] = ['jpg', 'jpeg', 'png', 'bmp'];

// ファイル名から拡張子を取得する関数
const getExt = (filename: string): string => {
  const pos = filename.lastIndexOf('.');
  if (pos === -1) {
    return '';
  }
  
  return filename.slice(pos + 1);
};

// ファイルが許可されている拡張子か確認する関数
const checkExt = (file: File | undefined): boolean => {
  if (file) {
    const ext = getExt(file.name).toLowerCase();
    if (allowExts.indexOf(ext) === -1) {
      return false;
    }
  }
  return true;
};

// 画像ファイルをBase64に変換
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Composition API
export default defineComponent({
  setup(props, context: SetupContext) {
    const uploadedImage = ref<string | ArrayBuffer | null>(null);
    const file = ref<File | undefined>(undefined);

    // ファイルがドラッグで追加されたときのメソッド
    const addDropFile = (e: DragEvent) => {
      const dt: DataTransfer | null = e.dataTransfer;
      if (dt) {
        file.value = dt.files[0];
      }
    };

    // ファイルの変更を監視し
    // 変更があれば、Base64に変換しviewを表示
    watch(file, (newFile, oldFile) => {
      if (checkExt(newFile)) {
        if (newFile) {
          getBase64(newFile).then((image: string | ArrayBuffer | null) => {
            uploadedImage.value = image;
            context.emit('change-file', file.value);
          });
        } else {
          uploadedImage.value = null;
        }
      } else {
        file.value = oldFile;
        context.emit('error-occurred', 'ファイル形式が正しくありません');
      }
    });

    return {
      uploadedImage,
      file,
      addDropFile,
    };
  },
});
</script>

<style scoped>
label > input {
  display: none;
}

label {
  padding: 0 1rem;
  border: solid 1px #888;
}

label::after {
  content: '+';
  font-size: 1rem;
  color: #888;
  padding-left: 1rem;
}
</style>
```

### 画像送信フォーム
```VPostForm.vue
<template>
  <v-row>
    <v-col cols="11" sm="8">
      <v-alert v-show="error" type="error">{{ error }}</v-alert>
    </v-col>
    <v-col cols="11">
      <a :href="url" target="_blank">{{ url }}</a>
    </v-col>
    <v-col cols="11">
      <v-img-field
        @change-file="changeFile"
        @error-occurred="catchError"
      />
    </v-col>
    <v-col cols="10">
      <v-btn @click="putImage">
        Post
        <v-icon>mdi-telegram</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import VImgField from '@/components/VImgField.vue';
// Firebaseにアップロードするモジュール
import Uploader from '@/utils/uploader';

export default Vue.extend({
  name: 'VPostForm',
  components: {
    VImgField
  },
  data: () => ({
    file: {} as File,
    error: '',
    url: ''
  }),
  methods: {
    changeFile(uploadedFile: File) {
      this.file = uploadedFile
    },
    catchError(msg: string) {
      this.error = msg
    },
    // アップロード
    async putImage() {
      this.isLoading = true;
      try {
        this.url = await Uploader.put(this.file);
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
  }
})
</script>
```

これで Vue で View 機能付きのフォームを作ることができました。

## 少し脱線
今回のフォームは、Composition API と Options API の両方を使用して、作っています。
理由として、私は、メソッドが多く複雑なコンポーネントは、Composition API を使用して、単純なコンポーネントは Options API を使用するみたいな使い分けをしています。

# Firebase 側の実装
## Firebase の setting

```@/plugins/firebase.ts
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_PROJECT,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId:process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(config);

export default firebase;
```

## アップロードをする関数
``` @/utils/uploader.ts
import firebase from '@/plugins/firebase'
const storageRef = firebase.storage().ref();

export default {
  put(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      // ファイルのパスを生成
      const mountainsRef = storageRef.child(`insects/${file.name}`);

      // ファイルをアップロード
      mountainsRef
        .put(file)
        .then((snapshot) => {
          // アップロードしたファイルのURLを取得
          snapshot.ref
            .getDownloadURL()
            .then((downloadURL: string) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error.message);
            });
         })
         .catch((error) => {
           reject(error.message);
         });
       });
  }
}
```
これで実装できます