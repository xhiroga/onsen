import axios from "axios";
import { SUZURI_TOKEN, SPOTIFY_TOKEN } from "../config/env";

// for suzuri api constants
const SUZURI_AUTH = "Bearer " + SUZURI_TOKEN;
const userId = 212030;

// fot spotify api constants
const SPOTIFY_AUTH = "Bearer " + SPOTIFY_TOKEN;

// fot suzuri api instance
const suzuriClient = axios.create({
  baseURL: 'https://suzuri.jp/api/v1',
  timeout: 1000,
  headers: {
  	Authorization: SUZURI_AUTH,
  	ContentType: 'application/json'
  }
});

// for spotify api instatce
const spotifyClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 1000,
  headers: {
  	Authorization: SPOTIFY_AUTH,
  	ContentType: 'application/json'
  }
});


// for our api instance
const apiClient = axios.create({
  baseURL: 'https://onsen-tsgen.herokuapp.com',
  timeout: 1000
});

export {suzuriClient, spotifyClient, apiClient};