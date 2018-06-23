# SpotifyのプレイリストIDからTシャツ用のデザインを生成するアプリ

## Documentation

1. アルバム情報の取得
2. 2次元コードの画像URL取得
3. Cloudinaryへのアルバム画像アップロード
4. デザイン画像生成
5. Tシャツ画像との合成


## ローカル実行

```sh
$ npm install
$ npm start
```

## Herokuのセットアップ
```
$ $ heroku plugins:install heroku-config
$ heroku config:push
```

## Herokuにデプロイ

```
$ heroku create
$ git push heroku master
$ heroku open
```

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)