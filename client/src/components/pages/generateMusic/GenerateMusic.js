import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserPlaylist, getRelatedArtist } from '../../../actions';
import LogInOption from '../LogInOption';
import SelectPlaylist from './SelectPlaylist';
import GeneratePlaylist from './GeneratePlaylist';

export default function GenerateMusic() {
  const [pickPlaylist, setPickPlaylist] = useState('');
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [userSavedPlaylist, setUserSavedPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);

  const playlists = useSelector((state) => state.userPlaylist);
  const relatedArtist = useSelector((state) => state.relatedArtist);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const handleClick = async (list) => {
    setLoadingPlaylist(true);

    if (recentlyPlayed.length !== 0 && userSavedPlaylist.length !== 0) {
      setPickPlaylist(list);
      setLoadingPlaylist(false);
      return;
    }

    await dispatch(getUserPlaylist(list));

    setPickPlaylist(list);
    setLoadingPlaylist(false);
    list === 'Playlists Salvas'
      ? setRecentlyPlayed(playlists)
      : setUserSavedPlaylist(playlists);

    return;
  };

  const getElementInfo = async (artistId, playlistId) => {
    setLoading(true);
    await dispatch(getRelatedArtist(artistId, playlistId));
    setLoading(false);
  };

  return !isLoggedIn ? (
    <LogInOption />
  ) : (
    <section>
      <SelectPlaylist
        handleClick={handleClick}
        trackId={relatedArtist.trackId}
        loading={loading}
      />

      <div className='w3-col homepage-container user-playlist'>
        <GeneratePlaylist
          pickPlaylist={pickPlaylist}
          recentlyPlayed={recentlyPlayed}
          userSavedPlaylist={userSavedPlaylist}
          loadingPlaylist={loadingPlaylist}
          getElementInfo={getElementInfo}
        />
      </div>
    </section>
  );
}
