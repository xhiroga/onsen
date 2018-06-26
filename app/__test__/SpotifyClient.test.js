import SpotifyClient from '../utilities/SpotifyClient';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "../config/env";

const code = 'AQC37j4cw87FnN-EA6ov41isUJmYZor9khm5uoIveX6GNgcvcsCiq7RW69xXt7YTA3juXKZco4snvFH-vXp9JJc8RR44R2wl2ac7GwfNrRUQvwHt0QfUcKaKKqgK6-uRWj3I_kX-5_RJM38LKP7jQPF7aD-TN1hvX4j_fwvsk7fMT9Diav8OMAmOhv2-TgYfI9Zz2uTeMdX61tQtz_6shfgSbemRWsubBjM7xTyXICKbHuPnlED5SeCxwoMyD1WPWpJx0g';

describe('SpotifyClient', () => {
    describe('setAccessToken()', () => {
        it('Access Tokenをセットできる', async function () {
            const client = new SpotifyClient({
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET
            });
            await client.setAccessRefreshToken(code);
            expect(client.accessToken).toBeDefined();
        });

        // it('Playlistの情報を取得できる', async function () {
        //     const client = new SpotifyClient({
        //         client_id: SPOTIFY_TEST_CLIENT_ID,
        //         client_secret: SPOTIFY_TEST_CLIENT_SECRET
        //     });
        //     await client.setAccessToken();
        //     playlistInfo = await client.getPlaylistData('2X3SX875sosVFp58m8puKv');
        //     expect(playlistInfo.owner.display_name).toBe('Hiroaki  Ogasawara');
        // });

        // it('ユーザーのPlaylistの一覧を取得できる', async function () {
        //     const client = new SpotifyClient({
        //         client_id: SPOTIFY_TEST_CLIENT_ID,
        //         client_secret: SPOTIFY_TEST_CLIENT_SECRET
        //     });
        //     await client.setAccessToken();
        //     myPlaylists = await client.getMyPlaylists();
        //     expect(playlistInfo.owner.display_name).toBeDefined();
        // });
    })
})

