require('dotenv').config()
const SpotifyApi = require('../common/SpotifyApi');
const CloudinaryApi = require('../common/CloudinaryApi');

describe('SpotifyAPIクライアントは', function () {
    console.log('process.env.spotify_client_id')
    console.log(process.env.spotify_client_id)
    const api = new SpotifyApi({
        client_id: process.env.spotify_client_id,
        client_secret: process.env.spotify_client_secret
    });

    it('Access Tokenをセットできる', async function () {
        await api.setAccessToken();
        expect(api.accessToken).toBeDefined();
    });

    it('Playlistの情報を取得できる', async function () {
        await api.setAccessToken();
        playlistInfo = await api.getPlaylistData('2X3SX875sosVFp58m8puKv');
        expect(playlistInfo.owner.display_name).toBe('Hiroaki  Ogasawara');
    });

});

describe('CloudinaryAPIクライアントは', function () {
    const api = new CloudinaryApi()
    it('プレイリストのステッカーを作成済ならURLを返す', async function () {
        const stickerUrl = await api.getPlayListStickerUrl('6I47QdMF935d9swQ7FX8r7');
        expect(stickerUrl).toMatch(/https:/);
    });

    it('プレイリストのステッカーを作成していなければブランクを返す', async function () {
        const stickerUrl = await api.getPlayListStickerUrl('1234567890');
        expect(stickerUrl).toBe('');
    });
});