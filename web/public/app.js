'use strict';

var playlistSticker = {};
const baseUrl = 'https://onsen-tsgen.herokuapp.com/tsgen?pl=';

playlistSticker.generateSticker = function () {
    var PLAYLIST_URL = $('#playlist-url').val()
    if ('' == PLAYLIST_URL) {
        alert('プレイリストのURLがブランクです');
        return
    }
    console.log(PLAYLIST_URL)
    var PLAYLIST_ID = PLAYLIST_URL;

    $.ajax({
        url: baseUrl + PLAYLIST_ID,
    })
        //
        .done(res => {
            console.log(res)
        })
        .fail(err => {
            console.log(err)
        })
}

playlistSticker.landingView = function () { }

playlistSticker.stickerView = function (problemNumber) {
    var title = 'Problem #' + problemNumber + ' Coming soon!'
    return $('<div class="problem-view">').text(title);
}
playlistSticker.showView = function (hash) {
    // ハッシュとルート関数の対応関係を持つオブジェクトをroutesオブジェクトとする
    var routes = {
        '#sticker': playlistSticker.stickerView
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]];
    if (viewFn) {
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
}

playlistSticker.appOnReady = function () {
    playlistSticker.showView(window.location.hash);
}