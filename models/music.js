const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  trackId: {
    type: String,
    required: true,
    unique: true,
  },
  date: String,
  name: String,
  artist: String,
  imageURL: String,
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

mongoose.model('musics', musicSchema);
