'use strict';

var playlistStciker = {};

playlistStciker.problemView = function (problemNumber) {
    var title = 'Problem #' + problemNumber + ' Coming soon!'
    return $('<div class="problem-view">').text(title);
}
playlistStciker.showView = function (hash) {
    // ハッシュとルート関数の対応関係を持つオブジェクトをroutesオブジェクトとする
    var routes = {
        '#problem': learnjs.problemView
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]];
    if (viewFn) {
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
}

playlistStciker.appOnReady = function () {
    playlistStciker.showView(window.location.hash);
}