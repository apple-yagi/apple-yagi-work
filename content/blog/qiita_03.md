---
date: 2020-01-21T00:00:00.000Z
title: オンライン周波数解析アプリを作ってみた
---

# 背景

今回、周波数解析アプリを作ってみた経緯として、現在私が所属している大学の研究室では、脈波や心電図について研究している班が複数あるのですが、それらを解析するためのソフト(WaveLab 有料ソフト)が入っている PC が１台しかないという現状です。

この現状により一つの班がソフトを使用している時に別の班は解析できないので、自分で作ってみようと思いました。また、オンラインで周波数解析ができるようになると、ネットに繋がってさえいれば、わざわざソフトをインストールせずにどこでも解析ができるようになり、とても便利になると考えています。

# 使用した言語について

この Web アプリケーションを作成するのに Python を使用しました。理由として、Python で有名なライブラリの Numpy と Scipy を使って作成しようと思ったからです。この 2 つのライブラリは、周波数解析をするための機能がたくさん入っているので、これらを使って作成していきます。

フレームワークで Django を使用した理由は Python の FW と言えば、Django なのかなと思ったので使用しました。

# 周波数解析モジュールの作成

脈波や心電図を解析するためのモジュールを作成します。
モジュール名は analysis.py にしています。

```py:title=analysis.py
import io
import pathlib
import numpy as np
from scipy import signal

import matplotlib.pyplot as plt

from .models import Pulse_Rate

def setPlt(pk):
    # 対象データを取得
    pulse_rate = Pulse_Rate.objects.get(pk=pk)
    path = pathlib.Path(pulse_rate.data.url)

    # データを読み込む
    f = open(path.resolve())
    lines = f.read().split()

    # -----変数の準備-----
    N = 4096
    lines_length = int(len(lines) / 2)
    if lines_length < N:
        N = 2048

    dt = float(lines[2]) - float(lines[0])
    pulse = []
    for num in range(N - 1):
        pulse.append(float(lines[num * 2 + 1]))
    # -------------------

    # -----サンプリング周波数計算-----
    t = np.arange(0, N * dt, dt) # time
    freq = np.linspace(0, 1.0 / dt, N) # frequency step
    # -----------------------------

    # -----波形の生成-----
    y = 0
    for pl in pulse:
        y += np.sin(2 * np.pi * pl * t)
    # -------------------

    # -----フーリエ変換-----
    yf = np.fft.fft(y)  # 高速フーリエ変換
    # --------------------

    # パワースペクトル算出
    yf_abs = np.abs(yf)


    # -----グラフの生成-----
    plt.figure()
    plt.subplot(211)
    plt.plot(t, y)
    plt.xlabel("time")
    plt.ylabel("amplitude")
    plt.grid()

    plt.subplot(212)
    plt.plot(freq, yf_abs)
    plt.xlim(0, 10)
    plt.xlabel("frequency")
    plt.ylabel("amplitude")
    plt.grid()
    plt.tight_layout()
```

こんな感じで脈波や心電図のグラフとパワースペクトルのグラフを生成します。データはユーザーがアップロードしたテキストファイルから読み出します。

# Web ページにグラフを表示する

上のモジュールでは plot でグラフを作成しているので、これを svg 形式で Web ページに表示したいと思います。

```py:title=analysis.py
def pltToSvg():
    buf = io.BytesIO()
    plt.savefig(buf, format='svg', bbox_inches='tight')
    s = buf.getvalue()
    buf.close()
    return s
```

これで plot を svg に変換して Web ページに表示することができます。

# views.py の設定

上記のモジュールを使用して views.py を書きます。

```py:title=views.py
def get_svg(request, pk):
    setPlt(pk)        # create the plot
    svg = pltToSvg()  # convert plot to SVG
    response = HttpResponse(svg, content_type='image/svg+xml')
    return response
```

これで HttpResponse(svg 形式)でレスポンスを返します。

# urls.py の設定

URL の設定をします。

```py:title=urls.py
urlpatterns = [
    ...
    path('pulse_rate-detail/<int:pk>/plot/', views.get_svg, name="plot"),
]
```

# templates の設定

今回グラフを表示するページは詳細画面にしたいと思います。

```html:title=pulse_rate_detail.html
<img src="{% url 'pulse_rate:plot' object.pk %}" width=600, height=300>
```

これでグラフを表示することができます。

# 作成したグラフ

実際に作成できるグラフは以下のようになります。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/d591275a-544c-678b-d934-40264dd83407.png)

# フィルタ処理をしたグラフの生成

上の図はフィルタ処理をしていないデータをグラフ化しているので、このままでは何もわかりません。そこでフィルタ処理の機能を追加してグラフを生成しました。（コードについては省きます）

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/533652/ab451519-081c-ca4c-c761-50c28b9a3c9d.png)

フィルタをかけるとなんとなく脈波っぽい波形がでます。（この脈波はカメラで撮影した RGB 値の G 成分を利用して出しているので、完璧な波形にはなりません）

フィルタの下限周波数と上限周波数は Web ページから自分で調整することができるようにしています。

# まとめ

今回作成したアプリケーションは今後研究室で使用していく予定です。また、私の所属している研究室では、心電図や脈波以外の研究をしている班もあるため、それらの班のためにも何か作成したいと考えています。実際、私の研究テーマは人の鼻の温度からその人のストレス度を測定するというテーマをしております。

私は自分の所属している研究室を大学内で一番イケてる研究室にしたいと考えているので４年生になってもこのようなアプリケーションを作成したいです！
