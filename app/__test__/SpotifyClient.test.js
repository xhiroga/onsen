import SpotifyClient from '../utilities/SpotifyClient';
import { SPOTIFY_TEST_CLIENT_ID, SPOTIFY_TEST_CLIENT_SECRET } from "../config/env";

describe('SpotifyClient', () => {
    describe('setAccessToken()', () => {
        it('Access Tokenをセットできる', async function () {
            const client = new SpotifyClient({
                client_id: SPOTIFY_TEST_CLIENT_ID,
                client_secret: SPOTIFY_TEST_CLIENT_SECRET
            });
            await client.setAccessToken();
            expect(client.accessToken).toBeDefined();
        });

        it('Playlistの情報を取得できる', async function () {
            const client = new SpotifyClient({
                client_id: SPOTIFY_TEST_CLIENT_ID,
                client_secret: SPOTIFY_TEST_CLIENT_SECRET
            });
            await client.setAccessToken();
            playlistInfo = await client.getPlaylistData('2X3SX875sosVFp58m8puKv');
            expect(playlistInfo.owner.display_name).toBe('Hiroaki  Ogasawara');
        });
    })
})

