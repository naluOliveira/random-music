const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genreID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

mongoose.model('genres', genreSchema);
