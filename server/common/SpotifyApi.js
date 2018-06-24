const axios = require('axios');
const querystring = require('querystring');

module.exports = class SpotifyApi {

    constructor(params) {
        this.client_id = params.client_id;
        this.client_secret = params.client_secret;
        console.log("client_id: " + this.client_id);
        console.log("client_secret: " + this.client_secret);
    }

    async setAccessToken() {
        const accessTokenBuffer = new Buffer.from(this.client_id + ':' + this.client_secret);
        const accessTokenClient = axios.create({
            baseURL: 'https://accounts.spotify.com/api/token',
            timeout: 1000,
            headers: {
                Authorization: 'Basic ' + accessTokenBuffer.toString('base64')
            }
        })

        return new Promise((resolve, reject) => {
            accessTokenClient.post('', querystring.stringify({ grant_type: 'client_credentials' }))
                .then(res => {
                    // console.log(res.data.access_token)
                    this.accessToken = res.data.access_token
                    resolve()
                })
                .catch(err => {
                    console.log(err)
                    reject()
                })
        })
    }

    async getPlaylistData(playlistId) {
        if (this.accessToken == undefined) {
            throw "先にsetAccessToken()を実行して下さい."
        }
        console.log('this.accessToken:' + this.accessToken)
        const playlistClient = axios.create({
            baseURL: 'https://api.spotify.com/v1',
            timeout: 1000,
            headers: {
                Authorization: "Bearer " + this.accessToken,
                ContentType: 'application/json'
            }
        })

        return new Promise((resolve, reject) => {

            playlistClient.get('users/spotify/playlists/' + playlistId + '/?market=JP')
                .then(res => {
                    // console.log(res.data)
                    resolve(res.data)
                })
                .catch(err => {
                    console.log(err)
                    resolve('') // 本当はrejectして500エラーを返すべきだと思うが、rejectとcatchの関係がよくわかっていないので省略
                })
        })
    }

};