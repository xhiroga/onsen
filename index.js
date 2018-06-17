const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const async = require('async')
const axios = require('axios')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'hdeoovqgo',
  api_key: '285728182166894',
  api_secret: 'Sk9j2x7-KxESZtAkINb0H_vr-rY'
});

var param = {
  "title": "",
  "imgArt": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
  "tsArt": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
  "imgLlc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
  "tsLlc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
}

var token = 'BQD0CdEuDhDZ2u8c6Be6SBGrGO_ck_iGWX2K8vk_Qu9iBB6AGH3oCn-tL56zth3ta8Enf_YvrM_-fEbzqXHEt6ympPu1wz-KQW3poPBy6C7hmN4-SfiUf88YjrKXRrSXUKiDKqcfzt2t3PeS14WZLTUUbq4Od4Q4tfdi5pz5QM0UP1mzon0TpXlk25H_6Xg-Fxp6pJnwXs-fmJVBWFy5s30ZqydN4fFgOK-gtkQhRzHK6aWFI9EColklH99QoCHEYco9qSJx39pOXYIYEW8IaNC5MlM'
const AUTH_TOKEN = "Bearer " + token;

var imgArt = "";
var imgTs = "";

const tsgen = (req, res) => {
  const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 1000,
    headers: {
      Authorization: AUTH_TOKEN,
      ContentType: 'application/json'
    }
  });
  instance.get('users/spotify/playlists/' + req.query.pl + '/?market=JP')
    .then(function (response) {
      console.log(response);
      console.log(response.data.name);

      const calls = []
      const trackAry = response.data.tracks.items
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
        const title = 'l_text:Sawarabi%20Mincho_160_center:' + response.data.name + ',y_262/'
        const qr = 'l_' + privateIdAry[6] + ',w_1260,g_south/'
        const suf = 'template.png'
        const url = pre + art1 + art2 + art3 + art4 + art5 + art6 + title + qr + suf

        console.log(url)
        cloudinary.v2.uploader.upload(url,
          function (error, result) {
            imgArt = result.public_id
            cloudinary.v2.uploader.upload('http://res.cloudinary.com/hdeoovqgo/image/upload/l_' + imgArt + ',w_600/ts.png',
              function (error, result) {
                tsArt = result.public_id
                res.type('json')
                res.json({
                  "title": response.data.name,
                  "imgArt": 'http://res.cloudinary.com/hdeoovqgo/image/upload/' + imgArt + '.png',
                  "tsArt": 'http://res.cloudinary.com/hdeoovqgo/image/upload/' + tsArt + '.png',
                  "imgLlc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
                  "tsLlc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
                })
              });
          });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/tsgen', (req, res) => {
    tsgen(req, res)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
