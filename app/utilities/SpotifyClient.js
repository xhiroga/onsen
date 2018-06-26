import axios from 'axios';
import { Buffer } from 'buffer';
import querystring from 'querystring';
import { TOKEN_REQUEST_REDIRECT_URL } from "../config/env";

class SpotifyClient {

    constructor(params) {
        this.client_id = params.client_id;
        this.client_secret = params.client_secret;
        console.log("client_id: " + this.client_id);
        console.log("client_secret: " + this.client_secret);
    }

    // 動作確認用
    getClient_id() { return this.client_id }

    async setAccessRefreshToken(code) {
        console.log('setAccessRefreshToken(code)')
        const accessTokenBuffer = new Buffer.from(this.client_id + ':' + this.client_secret);
        const accessTokenClient = axios.create({
            baseURL: 'https://accounts.spotify.com/api/token',
            timeout: 1000,
            headers: {
                Authorization: 'Basic ' + accessTokenBuffer.toString('base64')
            }
        })

        return new Promise((resolve, reject) => {
            accessTokenClient.post('', querystring.stringify({ grant_type: 'authorization_code', code: code, redirect_uri: TOKEN_REQUEST_REDIRECT_URL }))
                .then(res => {
                    this.accessToken = res.data.access_token
                    this.refreshToken = res.data.refresh_token
                    resolve()
                })
                .catch(err => {
                    console.log(err)
                    reject()
                })
        })
    }

    async getMyPlaylists() {
        console.log('this.accessToken:' + this.accessToken)
        if (this.accessToken == undefined) {
            throw "先にsetAccessRefreshToken(code)を実行して下さい."
        }
        const playlistsClient = axios.create({
            baseURL: 'https://api.spotify.com/v1',
            timeout: 1000,
            headers: {
                Authorization: "Bearer " + this.accessToken,
                ContentType: 'application/json'
            }
        })
        return new Promise((resolve, reject) => {

            playlistsClient.get('me/playlists')
                .then(res => {
                    console.log(res.data.items)
                    resolve(res.data.items)
                })
                .catch(err => {
                    console.log(err)
                    resolve('') // 本当はrejectして500エラーを返すべきだと思うが、rejectとcatchの関係がよくわかっていないので省略
                })
        })


    }
};

export default SpotifyClient