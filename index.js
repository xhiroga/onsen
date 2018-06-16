const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var param = {
  "img-art": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
  "ts-art": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
  "img-llc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/plimg.png",
  "ts-llc": "https://s3.amazonaws.com/hiroga/onsen-tsgen/tshirts.png",
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/tsgen', (req, res) => res.send(param))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
