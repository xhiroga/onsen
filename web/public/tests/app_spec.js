describe('PlaylistStickerは', function () {
    it('プレイリストのURLを渡されたら画面を処理中に差し替える', function () {


    })

    it('ステッカーのURLが返ってきたらステッカーを表示する', function () {
        playlistSticker.showView('#playlist-2X3SX875sosVFp58m8puKv');
        expect($('.view-container .sticker-view').length).toEqual(1);
    })

    it('ハッシュがなければランディングページを表示する', function () {
        playlistSticker.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    });


    // it('problemビューを表示できる', function(){
    //     learnjs.showView('#problem-1');
    //     expect($('.view-container .problem-view').length).toEqual(1);
    // });

    // it('ハッシュがなければランディングページを表示する', function(){
    //     learnjs.showView('');
    //     expect($('.view-container .landing-view').length).toEqual(1);
    // });

    // // スパイ
    // it('ビュー関数にハッシュビューパラメータを渡すこと', function() {
    //     spyOn(learnjs, 'problemView'); // スパイ対象のオブジェクト(=名前空間), 関数名の文字列
    //     learnjs.showView('#problem-42');
    //     expect(learnjs.problemView).toHaveBeenCalledWith('42');
    // });

    // it('ロードされたらルータを呼び出す', function(){
    //     spyOn(learnjs, 'showView'); //このテスト中のshowViewの動きを記録しておき、あとで専用の関数でアサートする
    //     learnjs.appOnReady();
    //     expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    // });

    // describe('problem viewは', function(){
    //     it('problem numberを含んだタイトルを持っている', function() {
    //         var view = learnjs.problemView('1');
    //         expect(view.text()).toEqual('Problem #1 Coming soon!');
    //     });
    // });
});