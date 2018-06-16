import axios from "axios";
import { SUZURI_TOKEN } from "../config/env";

// for suzuri api
const SUZURI_AUTH = "Bearer " + SUZURI_TOKEN;
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