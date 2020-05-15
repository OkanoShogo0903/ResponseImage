# ResponseImage

## 懸念
- 画像のロードタイミング
コンポーネントが読み込まれた時に読み込まれる

## TODO
### Step1 デプロイ
- [x] 最小構成デプロイ

### Step2 身内で使う程度
- アップロード画面
  - [x] 新しくキャラクターを追加すると位置ズレすごい
  - [x] キャラクター名やジャンルを入力するFromを生やす
  - [x] 画像を投稿するのはボタンを押したときにする
  - [ ] 新しくジャンルを追加できる

- 画像周りの機能と装飾
  - [?] プレイスホルダー
  - [ ] 画像クリック時にクリッボードに保存するロジック
  - [x] 画像クリック時にCOPY成功が分かるようなアニメーション
  - [x] FavのUIだけ作っておく
  - [ ] Favのサーバサイド実装

### Step2 知らない人にも使ってもらう (主に機能)
- 画像周りの機能と装飾
  - [ ] 画像の通報機能(要サーバサイド) 
    クライアントのキャッシュ、DB、S3に影響するからから超超超面倒... 
    サービスをFF外の人にも使ってもらうときは必要

- 画像置き場の機能
  - [ ] スクロールを検知して10枚ずつとかで画像を読み込むような構造(要サーバサイド)
    テストするには画像の枚数が必要なので、アップロード画面を頑張ってから作る

- DBを一新

### Step3 多くの知らない人にも使ってもらう (主にセキリティ)
- アップロード画面
  - [ ] 新しいジャンル登録画面が洗練されている
    プラスボタンを押すと、候補ジャンルにFormに入ってるジャンルを追加する
    同時にMultiFormにも追加する
    ** 最高のUIが思いつくまで保留 **

- [ ] 新しくジャンルを追加する
  - [ ] reCAPTCHA
    GoogleにAPI登録したりシークレットキーを発行する必要がある


## 質問
- サーバから受け取ったデータはどんな形で受け取るのがいいのか？
