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

const generatedMusicsSchema = new mongoose.Schema({
  trackId: String,
  name: String,
  artist: String,
  url: String,
  imageURL: String,
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
  generatedMusics: [generatedMusicsSchema],
});

mongoose.model('users', userSchema);
