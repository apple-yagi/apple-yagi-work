---
date: 2020-01-25T00:00:00.000Z
title: Vue.jsでTodoリストを作ってみた
---

# はじめに

Vue.js を学習し始めて２週間ほど経ったので Todo リストを作ってみました！

# 書き方\nVue.js は書き方が何種類かありますが、今回は HTML,Javascript のファイルに分けて書きたいと思います。

# ディレクトリツリー

```
root/
  ┝ index.html
  └ javascript/
      └ app.js
```

# HTML のコード

```html:title=index.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>Todoリスト</title><
    <!-- CDNにてVue.jsを導入 -->
    <script src="https://unpkg.com/vue@2.5.17"></script>
  </head>
  <body>
    <div id="app">
      <!-- 新しいタスクの入力フォーム -->
      <input type="text" placeholder="新しいタスク" v-model="newTask">
      <input type="submit" value="追加" @click="addTask">

      <!-- 達成率を表示 -->
      達成数： {{ completedTasks }} / {{ totalTasks }}

      <!-- タスクの一覧 -->
      <ul>
        <li v-for="(task, index) in tasks" :key="task.title">
          {{ task.title }}
          <button v-if="task.done" @click="completed(index)">完了</button>
          <label v-else>完了済み</label>
          <button @click="deleteTask(index)">削除</button>
        </li>
      </ul>
    </div>
    <script src="javascript/app.js"></script>
  </body>
</html>
```

# Javascript のコード

```js:title=app.js
const tasks = [
  { title: 'sample',
    done: false }
]

var app = new Vue({
  el: "#app",
  data: {
    tasks: tasks,
    newTask: null
  },
  methods: {
    completed: function(index) {
      this.tasks[index].done = true
    },
    addTask: function() {
      if(newTask){
        this.tasks.push({ title: this.newTask, done: false })
        this.newTask = null
      }
    },
    deleteTask: function(index) {
      this.tasks.splice(index, 1)
    }
  },
  computed: {
    completedTasks: function() {
      var count = 0
      for(let i = 0; i < this.tasks.length; i++) {
        if(this.tasks[i].done) {
          count++
        }
      }
      return count
    },
    totalTasks: function() {
      return this.tasks.length
    }
  }
})
```

# 実行結果

最初の画面
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/e2bd4a28-b658-4bc7-202d-099e8e3555a0.png)

完了ボタンを押した後

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/5045ac81-c3cd-1ab2-a4bf-db4930d34d3f.png)

残りの動作は省略

# まとめ

今回は CDN でお手軽に Vue.js を導入して Todo リストを作成しました。今後は VueCLI を使用して導入し単一ファイルでアプリケーションを作成したいと思います。
