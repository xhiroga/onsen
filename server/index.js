require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const async = require('async')
const axios = require('axios')
const cloudinary = require('cloudinary')
const SpotifyApi = require('./common/SpotifyApi')
const CloudinaryApi = require('./common/CloudinaryApi')

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
});

const spotifyApi = new SpotifyApi({
  client_id: process.env.spotify_client_id,
  client_secret: process.env.spotify_client_secret
});
const cloudinaryApi = new CloudinaryApi()

var imgArt = "";

async function tsgen(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const PLAYLIST_ID = req.query.pl

  await spotifyApi.setAccessToken();
  playlistData = await spotifyApi.getPlaylistData(PLAYLIST_ID);
  if ('' == playlistData) { res.send('') }
  console.log('Playlist is...')
  console.log(playlistData)
  const PLAYLIST_NAME = playlistData.name

  const stickerUrl = await cloudinaryApi.getPlayListStickerUrl(PLAYLIST_ID);
  if ('' != stickerUrl) {
    console.log('Sticker Detected!!!')
    cloudinary.v2.uploader.upload('http://res.cloudinary.com/hdeoovqgo/image/upload/l_' + PLAYLIST_ID + ',w_600/ts.png',
      function (error, result) {
        tsArt = result.public_id
        res.type('json')
        res.json({
          "title": PLAYLIST_NAME,
          "imgArt": stickerUrl,
          "tsArt": 'http://res.cloudinary.com/hdeoovqgo/image/upload/' + tsArt + '.png',
          "imgLlc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
          "tsLlc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
        })
      });

    return
  }
  const calls = []
  const trackAry = playlistData.tracks.items
  const artAry = []

  for (let i in trackAry) {
    if (i in [0, 1, 2, trackAry.length - 3, trackAry.length - 2, trackAry.length - 1]) {
      calls.push(function (callback) {
        cloudinary.v2.uploader.upload(trackAry[i].track.album.images[0].url,
          function (err, result) {
            if (err) {
              callback(err)
            } else {
              callback(null, result)
            }
          });
      })
    }
  }
  calls.push(function (callback) {
    cloudinary.v2.uploader.upload('https://scannables.scdn.co/uri/plain/jpeg/FFFFFF/black/1280/spotify:user:spotify:playlist:' + req.query.pl,
      function (err, result) {
        if (err) {
          callback(err)
        } else {
          callback(null, result)
        }
      });
  })

  var privateIdAry = []
  async.parallel(calls, function (err, result) {
    if (err) {
      console.log(err);
      return console.log(err);
    }
    for (let el of result) { privateIdAry.push(el.public_id) }
    console.log(privateIdAry)

    const pre = 'http://res.cloudinary.com/hdeoovqgo/image/upload/'
    const art1 = 'l_' + privateIdAry[0] + ',w_420,h_420,g_north_west/'
    const art2 = 'l_' + privateIdAry[1] + ',w_420,h_420,g_north_west,x_420/'
    const art3 = 'l_' + privateIdAry[2] + ',w_420,h_420,g_north_west,x_840/'
    const art4 = 'l_' + privateIdAry[3] + ',w_420,h_420,g_north_west,y_420/'
    const art5 = 'l_' + privateIdAry[4] + ',w_420,h_420,g_north_west,x_420,y_420/'
    const art6 = 'l_' + privateIdAry[5] + ',w_420,h_420,g_north_west,x_840,y_420/'
    const title = 'l_text:Sawarabi%20Mincho_100_center:' + PLAYLIST_NAME + ',y_262/'
    const qr = 'l_' + privateIdAry[6] + ',w_1260,g_south/'
    const suf = 'template.png'
    const url = pre + art1 + art2 + art3 + art4 + art5 + art6 + title + qr + suf

    console.log(url)
    cloudinary.v2.uploader.upload(url,
      { folder: 'stickers/', public_id: PLAYLIST_ID, tags: PLAYLIST_NAME },
      function (error, result) {
        imgArt = result.public_id
        cloudinary.v2.uploader.upload('http://res.cloudinary.com/hdeoovqgo/image/upload/l_' + imgArt + ',w_600/ts.png',
          function (error, result) {
            tsArt = result.public_id
            res.type('json')
            res.json({
              "title": PLAYLIST_NAME,
              "imgArt": 'http://res.cloudinary.com/hdeoovqgo/image/upload/' + imgArt + '.png',
              "tsArt": 'http://res.cloudinary.com/hdeoovqgo/image/upload/' + tsArt + '.png',
              "imgLlc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
              "tsLlc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
            })
          });
      });
  });
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.send("Server is working!!!");
  })
  .get('/tsgen', (req, res) => {
    tsgen(req, res)
  })
  // Spotifyのログイン認証にはWhit-listに載せたアプリのリンクを渡す必要がある。しかし、Expoの特性上、開発中はアプリのリンクが一意に定まらない。
  // したがって一度サーバーを経由させる。
  .get('/callback', (req, res) => {
    res.redirect(req.query.state + '?code=' + req.query.code)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
