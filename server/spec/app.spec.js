require('dotenv').config()
const SpotifyApi = require('../common/SpotifyApi');


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