const { express, mongoose } = require('../models/dependencies');
const { axiosSpotify, axiosSpotifyWrapper } = require('../routes/axiosSpotify');
const router = express.Router();
const Genre = mongoose.model('genres');
const Music = mongoose.model('musics');
const User = mongoose.model('users');
require('dotenv').config();

//HELPER FUNCTIONS
const randomNumbers = (num) => Math.trunc(Math.random() * num);
const getDate = () => {
  let date = new Date();
  let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('pt-BR', options);
};

const handleError = (error, req) => {
  if (error.response) {
    if (error.response.status === 401) {
      requestNewToken(req.user.spotifyID, req.user.refreshToken);
    } else if (error.request) {
      console.log(error.response.status);
    } else {
      console.log(error.message);
    }
  }
};

///////////////////////////////////////////////////

// PEGAR INFORMAÇÕES DO USUÁRIO
router.get('/api/user', (req, res) => {
  try {
    if (req.user) {
      const userInfo = {
        spotifyID: req.user.spotifyID,
        isLoggedIn: true,
        displayName: req.user.displayName,
        imageUrl: req.user.imageURL,
        generatedMusics: req.user.generatedMusics,
      };
      res.send(userInfo);
    } else {
      res.send(false);
    }
  } catch (e) {
    console.log(e);
  }
});

// PESQUISAR A MÚSICA DO DIA E SALVAR NO BANCO DE DADOS

router.get('/api/random_track', async (req, res) => {
  if (!req.user) {
    return res.end();
  }

  // CONFERE SE JÁ FOI GERADA UMA MUSICA ALEATÓRIA NAQUELE DIA
  /*  const existingMusic = await Music.findOne({ date: getDate() });
  if (existingMusic) {
    return res.send(existingMusic);
  } */
  const randomGenreID = randomNumbers(473);

  const result = await Genre.findOne({ genreID: randomGenreID });
  const query = result ? result.name.replace(/\s/g, '%20') : 'top%2000';

  try {
    const response = await axiosSpotifyWrapper(
      `/search?q=${query}&type=track&maket=from_token`,
      {
        headers: {
          'Accept': 'aplication/json',
          'Content-Type': 'aplication/json',
          'Authorization': `Bearer ${req.user.accessToken}`,
        },
      },
      req
    );

    const randomTrackID = randomNumbers(19);
    const { id, name, artists, uri, album } = response.data.tracks.items[
      randomTrackID
    ];
    const randomTrack = new Music({
      trackId: id,
      date: getDate(),
      name,
      artist: artists[0].name,
      imageURL: album.images[1].url,
      url: uri,
    });
    randomTrack.save();

    res.send(randomTrack);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

// PEGAR PLAYLIST DE MUSICAS NO BANCO DE DADOS

router.get('/api/random_playlist', (req, res) => {
  try {
    Music.find({}, (err, musics) => {
      if (err) throw new Error(err);
      res.send(musics);
    });
  } catch (error) {
    console.log(error);
  }
});

// PEGAR PLAYLISTS SALVAS DO USUÁRIO

router.get('/api/user_saved_playlists', async (req, res) => {
  // VER SE A PLAYLIST JÁ ESTÁ NO BANCO DE DADOS
  const getUser = await User.findOne({
    spotifyID: req.user.spotifyID,
  });
  if (getUser.savedPlaylists.length != 0) {
    return res.send(getUser.savedPlaylists);
  }

  // PEGAR A PLAYLIST DO SPOTIFY
  axiosSpotify
    .get(`/users/${req.user.spotifyID}/playlists?limit=10`, {
      headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'aplication/json',
        'Authorization': `Bearer ${req.user.accessToken}`,
      },
    })
    .then((response) => {
      const playlists = response.data.items.map((playlist) => {
        const { id, images, name, uri, owner } = playlist;
        return {
          playlistId: id,
          owner: owner.display_name,
          name,
          imageURL: images[0].url,
          url: uri,
        };
      });

      User.findOneAndUpdate(
        { spotifyID: req.user.spotifyID },
        { savedPlaylists: playlists }
      ).then((result) => result.save());

      res.send(playlists);
    })
    .catch((error) => {
      handleError(error, req);
    });
});

router.get('/api/recently_played', async (req, res) => {
  const getUser = await User.findOne({
    spotifyID: req.user.spotifyID,
  });
  if (getUser.recentlyPlayed.length != 0) {
    return res.send(getUser.recentlyPlayed);
  }

  axiosSpotify
    .get(`/me/player/recently-played?limit=10`, {
      headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'aplication/json',
        'Authorization': `Bearer ${req.user.accessToken}`,
      },
    })
    .then((response) => {
      const recentPlayed = response.data.items.map((music) => {
        const { track } = music;
        const { id, artists, name, album, uri } = track;
        return {
          trackId: id,
          artist: artists[0].name,
          artistId: artists[0].id,
          name: name,
          url: uri,
          imageURL: album.images[0].url,
        };
      });

      User.findOneAndUpdate(
        { spotifyID: req.user.spotifyID },
        { recentlyPlayed: recentPlayed }
      ).then((result) => result.save());

      res.send(recentPlayed);
    })
    .catch((error) => {
      handleError(error, req);
    });
});

router.get('/api/related_artist/', async (req, res) => {
  let artistId = req.query.artistId;
  const playlistId = req.query.playlistId;

  if (artistId === 'undefined') {
    await axiosSpotify
      .get(`/playlists/${playlistId}/tracks`, {
        headers: {
          'Accept': 'aplication/json',
          'Content-Type': 'aplication/json',
          'Authorization': `Bearer ${req.user.accessToken}`,
        },
      })
      .then((response) => {
        artistId = '';
        for (let i = 0; i < 5; i++) {
          artistId += response.data.items[i].track.album.artists[0].id + ',';
        }
      })
      .catch((error) => {
        handleError(error, req);
      });
  }

  axiosSpotify
    .get(`/recommendations?seed_artists=${artistId}`, {
      headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'aplication/json',
        'Authorization': `Bearer ${req.user.accessToken}`,
      },
    })
    .then((response) => {
      if (response.data.length === 0) {
        res.send(false);
      }

      const randomNum = randomNumbers(19);
      const data = response.data.tracks[randomNum];
      const recommendedTrack = {
        trackId: data.id,
        name: data.name,
        artist: data.artists[0].name,
        url: data.uri,
        imageURL: data.album.images[0].url,
      };
      console.log(recommendedTrack);
      User.findOne({ spotifyID: req.user.spotifyID }).then((result) => {
        result.generatedMusics.push(recommendedTrack);
        result.save();
      });
      res.send(recommendedTrack);
    })
    .catch((error) => {
      handleError(error, req);
    });
});

////////////////////////// PEGAR PLAYLIST GERADA DO USUARIO /////////////////////////////////////////
router.get('/api/generated_playlist', (req, res) => {
  try {
    User.findOne({
      spotifyID: req.user.spotifyID,
    }).then((result) => res.send(result.generatedMusics));
  } catch (error) {
    console.log(error);
  }
});

router.get('/api/remove_element', (req, res) => {
  const trackId = req.query.trackId;
  console.log(trackId);
  try {
    User.findOneAndUpdate(
      {
        spotifyID: req.user.spotifyID,
      },
      { $pull: { generatedMusics: { trackId: trackId } } }
    ).then((result) => {
      result.save((err, product) => {
        res.end();
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
