import React from 'react';

import Playlist from '../../playlist/Playlist';

export default function GeneratePlaylist({
  pickPlaylist,
  recentlyPlayed,
  userSavedPlaylist,
  loadingPlaylist,
  getElementInfo,
}) {
  return loadingPlaylist ? (
    <div className='generate-music-icon'>
      <i className='ui spinner loading large icon' />
      <div>Carregando</div>
    </div>
  ) : !pickPlaylist ? null : (
    <Playlist
      playlistItem={
        pickPlaylist === 'Playlists Salvas' ? userSavedPlaylist : recentlyPlayed
      }
      title={pickPlaylist}
      getElementInfo={(artistId, playlistId) => {
        getElementInfo(artistId, playlistId);
      }}
      noIcon={true}
    />
  );
}
