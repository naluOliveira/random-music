import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

import {
  getUserInfo,
  getRandomPlaylist,
  getRandomMusicResponse,
} from '../actions';
import VerticalSidebar from './sidebar/VerticalSidebar';

export default function DisplayContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getRandomPlaylist());
    dispatch(getRandomMusicResponse());
  }, []);

  return (
    <main className='w3-row'>
      <BrowserRouter>
        <VerticalSidebar />
        <section>
          <Routes />
        </section>
      </BrowserRouter>
    </main>
  );
}
