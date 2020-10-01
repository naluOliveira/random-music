const axios = require('axios');

const axiosSpotify = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

const axiosSpotifyAccount = axios.create({
  baseURL: 'https://accounts.spotify.com/api/token',
});

module.exports = { axiosSpotify, axiosSpotifyAccount };
