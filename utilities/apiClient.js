import axios from "axios";

// for suzuri api
const TOKEN = "";
const SUZURI_AUTH = "Bearer " + TOKEN;
const userId = 212030;

const suzuriClient = axios.create({
  baseURL: 'https://suzuri.jp/api/v1',
  timeout: 1000,
  headers: {
  	Authorization: SUZURI_AUTH,
  	ContentType: 'application/json'
  }
});

// for spotify api
const spotifyClient = axios.create({
	baseUrl: 'https://api.spotify.com/v1',
	timeout: 1000
});

export {suzuriClient, spotifyClient};