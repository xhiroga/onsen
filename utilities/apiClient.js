import axios from "axios";

const suzuriClient = axios.create({
  baseURL: 'https://suzuri.jp/api/v1',
  timeout: 1000
});

const spotifyClient = axios.create({
	baseUrl: 'https://api.spotify.com/v1',
	timeout: 1000
});

export {suzuriClient, spotifyClient};