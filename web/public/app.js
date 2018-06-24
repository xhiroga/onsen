'use strict'

var playlistSticker = {}
const webUrl = 'https://s3.amazonaws.com/playlist.sticker.io/index.html'
// const serverUrl = 'https://onsen-tsgen.herokuapp.com/tsgen?pl='
const serverUrl = 'http://localhost:5000/tsgen?pl='

playlistSticker.setPlaylist = function () {
    var PLAYLIST_URL = $('#playlist-url').val()
    if ('' == PLAYLIST_URL) {
        alert('プレイリストのURLがブランクです。')
        return
    }

    const reg = /playlist\/([^?]*)/
    var regResult = reg.exec(PLAYLIST_URL)
    if (null == regResult) {
        alert('プレイリストのIDを見つけられませんでした。\nURLの形式が間違っているかもしれません...')
        return
    }

    var PLAYLIST_ID = regResult[1]
    window.location.hash = 'sticker-' + PLAYLIST_ID
}

playlistSticker.findSticker = function (playlistId) {
    $.ajax({
        url: serverUrl + playlistId,
    })
        .done(res => {
            console.log(res)
            if ('' == res) {
                playlistSticker.noPlyalist()
                return
            }
            playlistSticker.stickerView(playlistId, res.imgArt)
        })
        .fail(err => {
            playlistSticker.noPlyalist()
        })
    playlistSticker.processingView()
}

// エラー処理
playlistSticker.noPlyalist = function () {
    alert('プレイリストを見つけられませんでした...')
    window.location.hash = ''
}

//  DOMの切り替え
playlistSticker.landingView = function () {
    $('.showcase').empty().append('<img class="tshirts" src="images/HeiseiSaigo-Natsu.png" width="400">')
}

playlistSticker.processingView = function () {
    $('.showcase').empty().append('<h1 class="processing">処理中・・・</h1>')
}

playlistSticker.stickerView = function (playlistId, stickerUrl) {
    $('.showcase').empty().append(
        '<img class="tshirts" src="images/ts-blank.png" width="400">' +
        '<a href="' + stickerUrl + '"><img class="sticker" src="' + stickerUrl + '"></a>' +
        '<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="好きなプレイリストをTシャツにしました。" data-url="' + webUrl + '#sticker-' + playlistId + '" data-hashtags="プレイリストTシャツ" data-lang="ja" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
    );
}

// ルーティング
playlistSticker.showView = function (hash) {
    var routes = {
        '#sticker': playlistSticker.findSticker
    }
    var hashParts = hash.split('-')
    var viewFn = routes[hashParts[0]]
    if (viewFn) {
        viewFn(hashParts[1])
    } else {
        playlistSticker.landingView()
    }
}

playlistSticker.appOnReady = function () {
    window.onhashchange = function () {
        playlistSticker.showView(window.location.hash)
    }
    playlistSticker.showView(window.location.hash)
}