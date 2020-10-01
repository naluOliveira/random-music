import { combineReducers } from 'redux';

import sidebarItemReducer from './sidebarItemReducer';
import spotifyAuthReducer from './spotifyAuthReducer';
import randomMusicReducer from './randomMusicReducer';
import randomPlaylistReducer from './randomPlaylistReducer';
import userPlaylistReducer from './userPlaylistReducer';
import relatedArtistReducer from './relatedArtistReducer';

export default combineReducers({
  items: sidebarItemReducer,
  auth: spotifyAuthReducer,
  randomMusic: randomMusicReducer,
  randomPlaylist: randomPlaylistReducer,
  userPlaylist: userPlaylistReducer,
  relatedArtist: relatedArtistReducer,
});
