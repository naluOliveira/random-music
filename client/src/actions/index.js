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

export const getUserPlaylist = () => async (dispatch) => {
  const userPlaylist = await axios.get('/api/user_saved_playlists');

  dispatch({ type: 'GET_USER_PLAYLIST', payload: userPlaylist.data });
};

export const getRecentlyPlayed = () => async (dispatch) => {
  const recentlyPlayed = await axios.get('/api/recently_played');

  dispatch({ type: 'RECENTLY_PLAYED', payload: recentlyPlayed.data });
};

export const getRelatedArtist = (artistId) => async (dispatch) => {
  const relatedArtist = await axios.get(`/api/related_artist`, {
    params: {
      artistId: `${artistId}`,
    },
  });

  dispatch({ type: 'RELATED_ARTIST', payload: relatedArtist.data });
};

export const getRelatedPlaylist = (playlistId) => async (dispatch) => {
  const relatedPlaylist = await axios.get(`/api/related_artist`, {
    params: {
      playlistId: `${playlistId}`,
    },
  });
  dispatch({ type: 'RELATED_PLAYLIST', payload: relatedPlaylist.data });
};

export const getElementInfo = (trackId) => {
  return { type: 'ELEM_INFO', payload: trackId };
};
