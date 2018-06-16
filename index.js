const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const axios = require('axios')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'hdeoovqgo',
  api_key: '285728182166894',
  api_secret: 'Sk9j2x7-KxESZtAkINb0H_vr-rY'
});

var param = {
  "img-art": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
  "ts-art": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
  "img-llc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
  "ts-llc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
}

var token = 'BQA0FNTzpRiauxfrTXLpmNDpBZUPdveJBhLlWO-F7fhQ4LVAxHebPZd70nHWTwbVjdmawdN6M0VOwb43OJ8NeRyc3A6A8soU4RSt_iSVhmEEreWA8BqPySGcI_d4lfL9oLCSMiiuwWxzVoZ7ZxVeTta2L3YAPG2WdXI'
const AUTH_TOKEN = "Bearer " + token;

const tsgen = (req, res) => {
  const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 1000,
    headers: {
      Authorization: AUTH_TOKEN,
      ContentType: 'application/json'
    }
  });
  instance.get('users/spotify/playlists/' + req.query.pl + '/tracks?market=JP')
    .then(function (response) {
      console.log(response);
      console.log(response.data.items);

      const trackAry = response.data.items
      const artAry = []
      for (let i in trackAry) {
        console.log(trackAry[i].track.album.images[0])
        artAry.push(trackAry[i].track.album.images[0].url)
      }
      console.log(artAry)

      const publicIdAry = []


    })
    .catch(function (error) {
      console.log(error);
    });

  res.type('json')
  res.json(param)
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
