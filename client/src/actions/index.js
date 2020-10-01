import axios from 'axios';

export const getUserInfo = () => async (dispatch) => {
  const userInfo = await axios.get('/api/user');

  dispatch({ type: 'GET_USER_INFO', payload: userInfo.data });
};

export const getRandomMusicResponse = () => async (dispatch) => {
  const randomMusic = await axios.get('/api/random_track');

  dispatch({ type: 'GET_RANDOM_MUSIC', payload: randomMusic.data });
};

export const getRandomPlaylist = () => async (dispatch) => {
  const playlist = await axios.get('/api/random_playlist');

  dispatch({ type: 'GET_RANDOM_PLAYLIST', payload: playlist.data });
};

export const getUserPlaylist = (request) => async (dispatch) => {
  let data =
    request === 'Playlists Salvas'
      ? await axios.get('/api/user_saved_playlists')
      : await axios.get('/api/recently_played');

  dispatch({ type: 'GET_USER_PLAYLIST', payload: data.data });
};

export const getRelatedArtist = (artistId, playlistId) => async (dispatch) => {
  const relatedArtist = await axios.get(`/api/related_artist`, {
    params: {
      artistId: `${artistId}`,
      playlistId: `${playlistId}`,
    },
  });

  dispatch({ type: 'RELATED_ARTIST', payload: relatedArtist.data });
};
