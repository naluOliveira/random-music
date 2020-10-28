const axios = require('axios');
const qs = require('querystring');

const axiosSpotify = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

const axiosSpotifyAccount = axios.create({
  baseURL: 'https://accounts.spotify.com/api/token',
});

const requestNewToken = async (spotifyID, refreshToken) => {
  const client = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString('base64');

  let response;
  try {
    response = await axiosSpotifyAccount.post(
      '',
      qs.stringify({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${client}`,
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }

  const result = await User.findOneAndUpdate(
    { spotifyID: spotifyID },
    { accessToken: response.data.access_token }
  );
  result.save();
};

const axiosSpotifyWrapper = async (url, config, req) => {
  try {
    return await axiosSpotify.get(url, config, req);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        await requestNewToken(req.user.spotifyID, req.user.refreshToken);
        return axiosSpotify.get(url, config, req);
      }
    }
  }
};

module.exports = { axiosSpotify, axiosSpotifyAccount, axiosSpotifyWrapper };
