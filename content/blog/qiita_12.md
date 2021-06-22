---
date: 2020-12-31T00:00:00.000Z
title: 学生エンジニアの自分が2020年に勉強したWeb技術
---
# 軽く自己紹介
私は、現在大学 4 年生で 2019 年の 11 月から Web(HTML, CSS から)について勉強をはじめました。そんな自分がこの一年(2019 年 11 月~2020 年 12 月)で、どのような技術を学んだのか、自分の備忘録も兼ねて紹介していきたいと思います。それでは、早速紹介していきたいと思います。

# HTML, CSS, JavaScript（学習期間 2019 年 11 月）
この 3 つは、わざわざいう必要も無いと思いましたが、一応書いておきます。普段、Web アプリを作っていれば、この 3 つは必然的に学習すると思いますが、これらだけを学習したのは、１週間くらいしかやって無いです。あとは、実際に Web アプリを作っていく中で学習していきました。

# Ruby, Ruby on Rails（学習期間 2019 年 11~12 月）
![image.svg](https://cdn.svgporn.com/logos/rails.svg)

Ruby on Rails は、オープンソースの Web アプリケーションフレームワークである。RoR または単に Rails と呼ばれる。その名にも示されているように Ruby で書かれている。また Model View Controller アーキテクチャに基づいて構築されている。
[公式ページ](https://rubyonrails.org/)

自分が１番最初に学習したフレームワークは、Web 系では定番の Ruby on Rails です。これを使って、初めての[ポートフォリオ](https://yagi-booklist.herokuapp.com/users/login)を作成しました。

このフレームワークを学んで、MVC の概念や RESTful など Web 技術の基礎的な考え方を身につけることができたので、初学者の方には、おすすめしたいです。ただ、最初の頃はフレームワークの処理の手順が正しく追えず、大変でした...

Ruby on Rails は自分の初めて学習したフレームワークなので愛着があり、他の大学生の人たちで使える人が多いので、チーム開発やハッカソンをするときに、よく使います。

# Heroku（学習期間 2019 年 12 月）
![image.svg](https://cdn.svgporn.com/logos/heroku.svg)

Heroku は 2007 年創業のアメリカ合衆国の企業。また、同社が開発と運営を行っている PaaS の名称でもある。2010 年にはセールスフォース・ドットコムに買収された。[公式ページ](https://jp.heroku.com/) 

自分の初めてのポートフォリオをネット上に公開するために使用しました。簡単に Web アプリケーションを公開することができるので、初めてのデプロイには、とてもおすすめです。

ただ、難点としてアクセス数が一定時間無いと、サーバがシャットダウンするようで、上記で紹介したポートフォリオも最初のアクセスに時間がかかることがわかると思います。

Heroku は最初のポートフォリオをデプロイして以来、使用してなく、今後も使用しないと思います...

# Django（学習期間 2019 年 12 月~2020 年 1 月）
![image.svg](https://cdn.svgporn.com/logos/django.svg)

Django は、Python で実装された Web アプリケーションフレームワーク。MVC デザインパターンに緩やかに従う。もともとはアメリカ合衆国カンザス州ローレンスにある World Company のために、ニュース系のサイトを管理する目的で開発され、2005 年 7 月に BSD License で公式にリリースされた。[公式ページ](https://docs.djangoproject.com/ja/3.1/)

次に学習したフレームワークは、Django です。これは、自分の所属している研究室で使用するツールを作成するために、学習しました。こちらの[Qiita 記事](https://qiita.com/apple-yagi/items/5555d05d81dded3a69e1)に記載してるので、もし良ければ見てください。

このフレームワークは、MVT パターンという少し変わった概念のフレームワークですが、Rails を学習している方であれば、処理の手順は追いやすいかと思います。実際に、私も２週間で研究室のツールを作れました。

Django は Python のフレームワークということもあって、少ないコード数でアプリケーションを作ることができます。Python を使った経験がある方には、とてもおすすめできるフレームワークです。

# Aamazon Web Service（EC2）（学習期間 2020 年 1 月 ）
![image.svg](https://cdn.svgporn.com/logos/aws-ec2.svg)

Amazon Elastic Compute Cloud (Amazon EC2) は、安全でサイズ変更可能なコンピューティング性能をクラウド内で提供するウェブサービスです。[公式ページ](https://aws.amazon.com/jp/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc)

上記の Django の Web アプリをデプロイするために、使用しました。Heroku との違いは、SSH 接続してデプロイをしないといけないことや、ミドルウェアの設定などの諸々の設定を手動で行わないといけない点です。 また、ネットワークについての知識も必要となるため、デプロイの難易度が Heroku とは段違いに難しいです。しかし、メリットとしてアクセスがないときも起動しているため、初回のアクセスに時間がかかることはないのが強いと思います。

AWS の EC2 は、インフラ系の知識（SSH 接続、ネットワークなど）を学ぶことができるので、Web アプリケーションをある程度作れるようになった方のステップアップとして、良いと思います。

# Vue.js（学習期間 2020 年 2~3 月）
![image.svg](https://cdn.svgporn.com/logos/vue.svg)

Vue.js または Vue は、Web アプリケーションにおけるユーザーインターフェイスを構築するための、オープンソースの JavaScript フレームワークである。他の JavaScript ライブラリを使用するプロジェクトへの導入において、容易になるように設計されている。[公式ページ](https://jp.vuejs.org/index.html)

Rails, Django をやってきて、バックエンドをある程度把握することができたと思ったので、ここで Vue.js を学習しました。また、アウトプットとして、[Gurustagram](https://gurustagram-app.firebaseapp.com/#/)と言う Web アプリを作成しました。

Vue.js を学習した時は、正直 JavaScript の知識は全くなかったですが、問題なく学習することができました。HTML, CSS をある程度理解していれば、なんとなくできるようになると思います。ただ、API 通信や Vuex あたりは JavaScript の知識が必須になるので、Vue.js と同時並行して JavaScript も学習しました。

# Firebase（学習期間 2020 年 2~3 月）
![image.svg](https://cdn.svgporn.com/logos/firebase.svg)

Firebase は、2011 年に Firebase, Inc.が開発したモバイル・Web アプリケーション開発プラットフォームで、その後 2014 年に Google に買収された。 2020 年 3 月現在、Firebase プラットフォームには 19 の製品があり、9GAG を含む 150 万以上のアプリが利用されている。[公式ページ](https://firebase.google.com/?hl=ja)

Vue.js で Web アプリを作るときに、どうせならいつもと違う構成にしたいと思い、Firebase を学習しました。一時期、サーバーサイドエンジニア不要論が出た通り、これが使えるようになればフロントエンドフレームワークだけである程度の Web アプリは作れてしまいます。ただ、アプリケーションの規模が大きくなるに連れて、データベース設計などで問題が生じてくると思うので、あくまで個人開発や小規模アプリに限定されると思います。

Firebase は、ハッカソンなどの短期間でアプリを作るときに、とても使えるので持っておくと何かと便利な技術の 1 つだと思うので、学習におすすめです。

# Node.js, Express.js（学習期間 2020 年 4~5 月）
![image.svg](https://cdn.svgporn.com/logos/express.svg)

Express.js は、サーバーサイド JavaScript の Node.js の Web アプリケーションフレームワークである。シングルページ／マルチページ／混在の各種 Web アプリケーションの構築のためにデザインされている。[公式ページ](http://expressjs.com/)

Vue.js を学習して、フロントエンドと API サーバを分けてシステム設計をするのが、昨今の主流と言うことを知り、手軽に API サーバを作成できるフレームワークである Express を学習しました。これまで Ruby on Rails や Django のようなモノシリックなフレームワークばかり触っていたので、Express を学習して、バックエンドの世界観がかなり変わりました。Rails, Django, Laravel しか触ったことない方は、ぜひ触ってみて欲しいと思います。

# Amazon Web Service（ECS, RDS, S3, Lambda）（学習期間 2020 年 5 月）
![image.svg](https://cdn.svgporn.com/logos/aws.svg)

Express と Vue.js で作成した Web アプリをデプロイするために、AWS の中の上記のサービスについて学習しました。以下が実際に構築したシステム図です。

![image.svg](https://pbs.twimg.com/media/EYYyCNiU4AMMEho?format=jpg&name=large)

# Docker（学習期間 2020 年 4~5 月）
![image.svg](https://cdn.svgporn.com/logos/docker.svg)

Docker は、コンテナ仮想化を用いてアプリケーションを開発・配置・実行するためのオープンソースソフトウェアあるいはオープンプラットフォームである。 Docker はコンテナ仮想化を用いた OS レベルの仮想化によりアプリケーションを開発・実行環境から隔離し、アプリケーションの素早い提供を可能にする。[公式ページ](https://www.docker.com/)

Express で API サーバを作成する際に、一緒に Docker を学習しました。Docker はめちゃめちゃ便利で、これを学習して以降 Web アプリを開発する時は、必ず Docker を使って、環境構築を行っています。

デプロイもコンテナベースで行うことが多く、ECS などもコンテナでのデプロイをすることができます。

# Circle CI（学習期間 2020 年 4~5 月）
![image.svg](https://cdn.svgporn.com/logos/circleci.svg)

CircleCI を利用すると、ビルド、テスト、デプロイ、デリバリーといったプロセスを自動化できるため、信頼性の高いコードをリリースできます。Samsung、Ford Motor Company、Spotify、Lyft、Coinbase、PagerDuty、Stitch Fix、BuzzFeed をはじめ数千社の大手企業が、ソフトウェア開発の効率化と品質向上のために CircleCI を採用しています。[公式ページ](https://circleci.com/ja/)

Circle CI は自動デプロイを行うツールです。ただ、コンテナベースのデプロイしか支援してない？ので、Docker などのコンテナ仮想化ツールを扱えることが必須になります。

Circle CI は便利ではありましたが、最近は Github Actions を多用しているため出番はあまりないツールになってしまいました。ただ、自動デプロイができると開発効率が格段に上がると思うので、ぜひおすすめです。

# Nuxt.js（学習期間 2020 年 6 月）
![image.svg](https://cdn.svgporn.com/logos/nuxt.svg)

Nuxt.js は、Vue.js、Node.js、Webpack、Babel.js に基づく無料のオープンソース Web アプリケーションフレームワークです。このフレームワークは、「ユニバーサルアプリケーションのメタフレームワーク」として宣伝されています。[公式ページ](https://ja.nuxtjs.org/)

Nuxt.js は、Vue Router や Vuex などがデフォルトで入っているので、めちゃくちゃ便利です。ただ、SSR の挙動をしっかり理解して制御するのは、難しいので Vue.js を書く時とは、違う注意点があります。

Nuxt.js はフロントエンドフレームワークの私のメインウェポンなので、とてもお気に入りです。

# Rust（学習期間 2020 年 7 月）
![image.svg](https://cdn.svgporn.com/logos/rust.svg)

Rust は Mozilla が支援するオープンソースのシステムプログラミング言語である。 Rust 言語は速度、並行性、安全性を言語仕様として保証する C 言語、C++に代わるシステムプログラミングに適したプログラミング言語を目指している。[公式ページ](https://www.rust-lang.org/ja)

Rust は C++の悪いところをカバーしたような言語で、C++を知っている人には、ぜひ触って欲しい言語です。C++の悪いところが、どんどん分かってくると思います。また、所有権やライフサイクルなどと言った他の言語にはない概念が存在するので、純粋にコーディング能力も向上すると思います。

# TypeScript（学習期間 2020 年 6~7 月）
![image.svg](https://cdn.svgporn.com/logos/typescript.svg)

TypeScript はマイクロソフトによって開発され、メンテナンスされているフリーでオープンソースのプログラミング言語である。TypeScript は JavaScript に対して、省略も可能な静的型付けとクラスベースオブジェクト指向を加えた厳密なスーパーセットとなっている。[公式ページ](https://www.typescriptlang.org/)

最近のフロントエンド開発には、TypeScript が主流になっていると聞いて、学習しました。これを使えるようになると、生の JS は書けなくなるくらい型依存症になります。ただ、Vue.js との相性がそこまで良くないので、Vue✖️TypeScript で使用するときは、若干ストレスに感じる時があります。

# Nest.js（学習期間 2020 年 6~7 月）
![image.svg](https://cdn.svgporn.com/logos/nestjs.svg)

Nest（NestJS）は、効率的でスケーラブルな Node.js サーバー側アプリケーションを構築するためのフレームワークです。プログレッシブ JavaScript を使用し、TypeScript で構築され、完全にサポートされ（開発者は、純粋な JavaScript でコーディングできます）、OOP（オブジェクト指向プログラミング）、FP（関数型プログラミング）、および FRP（関数型リアクティブプログラミング）の要素を組み合わせます。[公式ページ](https://nestjs.com/)

Nest.js は私が最も好きなフレームワークです。このフレームワークは DI（依存性の注入）に基づいた構成になっていて、めちゃくちゃ良いなと思ってます。また、cli でディレクトリやファイルを作成することができる点や TypeScript でしか書けないため、チーム開発に向いているフレームワークだと思ってます。

# Graph QL（学習期間 2020 年 8 月）
![image.svg](https://cdn.svgporn.com/logos/graphql.svg)

GraphQL は API 向けに作られたクエリ言語およびランタイムである。 ウェブ API の開発に、REST やその他の Web サービスと比較して、効率的、堅牢、フレキシブルなアプローチを提供する。GraphQL では、クライアントが必要なデータの構造を定義することができ、サーバーからは定義したのと同じ構造のデータが返される[公式ページ](https://graphql.org/)

# React（学習期間 2020 年 8 月）
![image.svg](https://cdn.svgporn.com/logos/react.svg)

React は、Facebook とコミュニティによって開発されているユーザインタフェース構築のための JavaScript ライブラリである。React.js または ReactJS の名称でも知られている。 React はシングルページアプリケーションやモバイルアプリケーションの開発におけるベースとして使用することができる。[公式ページ](https://ja.reactjs.org/)

フロントエンド開発を Vue✖️TypeScript でやっていて、React の方が TypeScript と相性が良いというのを聞いて、学習しました。確かに、HTML の部分で型が効く React の方が TypeScript と相性が良いし、store との相性も良くて、Vue から乗り換えるのもありかなと思いました。でも、Vue.js は、v-if や v-for などがあったり、元々やっていたということもあって、しばらくは Vue.js で良いかなと思います。

自分の印象では、React はロジックが書きやすく、Vue は HTML 部分が書きやすいという印象です。

# Go（学習期間 2020 年 9 月）
![image.svg](https://cdn.svgporn.com/logos/gopher.svg)

Go はプログラミング言語の 1 つである。2009 年、Google で Robert Griesemer、ロブ・パイク、ケン・トンプソンによって設計された。Go は、静的型付け、C 言語の伝統に則ったコンパイル言語、メモリ安全性、ガベージコレクション、構造的型付け、CSP スタイルの並行性などの特徴を持つ。[公式ページ](https://golang.org/)

Go は、流行っているからやってみようという乗りでやってみました。パッケージ管理の仕組みが素晴らしいという印象で、コードの書き味は、そこそこっていう感じです（個人の意見）。

Go でバックエンド開発をする時は、フレームワークに Gin, ORM に GORM を使用しています。もし、他に良いのがあれば教えてください。

# Next.js(学習期間 2020 年 11 月)
![image.svg](https://cdn.svgporn.com/logos/nextjs.svg)

Next.js は、オープンソースの React フロントエンド開発 Web フレームワークであり、サーバーサイドレンダリングや React ベースの Web アプリケーション用の静的 Web サイトの生成などの機能を有効にします。 [公式ページ](https://nextjs.org/)

今年、最後に学習したものは、Next.js です。最近、Nuxt.js vs Next.js みたいなものをよく見るので、自分自身の手で確かめたく学習しました。自分的には、Nuxt.js より Next.js の方がいろいろと進んでいるなという印象でした。特に、SSG（静的サイトジェネレーター）の機能が Next.js の方が圧倒的に良いと感じたので、

今後 Firebase や Netlify にフロントエンドをデプロイするときは、使用したいなと思います。

# まとめ
以上で、今年自分が学習した技術の紹介は終わりです。ここに書いたもの以外にも、Riot.js, Svelte, PHP（Laravel）, Scala（Play Framework）, Swift, Google Cloud Platform, Netlify, Github Actions など本当にいろいろなものを触りました。

今年は、1 人で技術を探究することに専念しましたが、来年は、いろいろな人と関わりを持って、もっと成長できる 1 年にしていきたいと思います！