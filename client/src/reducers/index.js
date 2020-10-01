import { combineReducers } from 'redux';

import sidebarItemReducer from './sidebarItemReducer';
import spotifyAuthReducer from './spotifyAuthReducer';
import randomMusicReducer from './randomMusicReducer';
import randomPlaylistReducer from './randomPlaylistReducer';
import userPlaylistReducer from './userPlaylistReducer';
import recentlyPlayedReducer from './recentlyPlayedReducer';
import relatedArtistReducer from './relatedArtistReducer';
import playTrackReducer from './playTrackReducer';

export default combineReducers({
  items: sidebarItemReducer,
  auth: spotifyAuthReducer,
  randomMusic: randomMusicReducer,
  randomPlaylist: randomPlaylistReducer,
  userPlaylist: userPlaylistReducer,
  recentlyPlayed: recentlyPlayedReducer,
  relatedArtist: relatedArtistReducer,
  playTrack: playTrackReducer,
});
