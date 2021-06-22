---
date: 2020-01-10T00:00:00.000Z
title: Ruby on Railsのアプリケーションをgit cloneする
---

# はじめに

学生エンジニアの覚え書きです。参考になれば幸いです。

使用している PC は Mac を使用しているので Windows の方は注意してください。

# まずは GitHub から clone をする

クローンするアプリケーションを置きたいディレクトリに移動したあと

```
$ git clone https://github.com/example/test.git\n
```

URL にはクローンしたいリポジトリの URL を入れてください

# bundle install をする

クローンしたアプリケーションで使用する gem をインストールします。

```
$ bundle install
```

これでうまくいくはずが

```
An error occurred while installing mysql2 (0.5.3), and Bundler cannot continue.
Make sure that `gem install mysql2 -v '0.5.3' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:\n  mysql2
```

エラーが出ました

mysql2 の gemfile がインストールできない様子

ググって見ると、こちらの記事を発見し解決できました。

[Rails MySQL2 が bundle install できない時の対応方法](https://qiita.com/fukuda_fu/items/463a39406ce713396403)

```
$ bundle config --local build.mysql2 "--with-cppflags=-I/usr/local/opt/openssl/include"
$ bundle config --local build.mysql2 "--with-ldflags=-L/usr/local/opt/openssl/lib"
```

このコマンドを打ったあと

```
$ bundle install
```

すると、うまくインストールできました。

```
Bundle complete! 22 Gemfile dependencies, 97 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
```

# データベースの作成

ここからはデータベースを作成していきます。

```
$ rails db:create
$ rails db:migrate
```

これでデータベースは作成できました。

# アプリケーションの起動

ここまで来たら最後に

```
$ rails s
```

をして起動すれば完了です。

# 最後に

今回は GitHub から clone したアプリケーションをローカル環境で動かすことをしました。

起動したあとも正常に動作しない点はあると思うので動作確認は怠らないようにしてください。

注意点として clone した際に.gitignore に指定されているフォルダ、ファイルは clone されないので API キーなどを.env などのファイルに書いている方は作成してください。
