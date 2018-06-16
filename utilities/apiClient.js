import axios from "axios";

// for suzuri api
const suzuriClient = axios.create({
  baseURL: 'https://suzuri.jp/api/v1',
  timeout: 1000
});

// for spotify api
const spotifyClient = axios.create({
	baseUrl: 'https://api.spotify.com/v1',
	timeout: 1000
});

export {suzuriClient, spotifyClient};