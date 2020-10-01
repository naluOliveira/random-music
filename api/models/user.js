const mongoose = require('mongoose');

const savedPlaylistsSchema = new mongoose.Schema({
  playlistId: String,
  owner: String,
  name: String,
  imageURL: String,
  url: String,
});

const recentlyPlayedSchema = new mongoose.Schema({
  trackId: String,
  artist: String,
  artistId: String,
  name: String,
  imageURL: String,
  url: String,
});

const userSchema = new mongoose.Schema({
  spotifyID: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  imageURL: String,
  accessToken: String,
  refreshToken: String,
  savedPlaylists: [savedPlaylistsSchema],
  recentlyPlayed: [recentlyPlayedSchema],
});

mongoose.model('users', userSchema);
