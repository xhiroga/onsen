'use strict';

var learnjs = {}; //名前空間の定義。これをしないと、他のライブラリも使用するグローバルスコープで変数などを定義してしまう。

learnjs.problemView = function(problemNumber){
    var title = 'Problem #' + problemNumber + ' Coming soon!'
    return $('<div class="problem-view">').text(title);
}
learnjs.showView = function(hash) {
    // ハッシュとルート関数の対応関係を持つオブジェクトをroutesオブジェクトとする
    var routes = {
        '#problem': learnjs.problemView
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]];
    if(viewFn){
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
}

learnjs.appOnReady = function() {
    learnjs.showView(window.location.hash);
}