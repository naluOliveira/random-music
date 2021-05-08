import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import GenerateMusic from './pages/generateMusic/GenerateMusic';
import RandomPlaylist from './pages/RandomPlaylist';
import UserPlaylist from './pages/UserPlaylist';

export default function Routes() {
  return (
    <React.Fragment>
      <Route path='/' exact component={HomePage} />
      <Route path='/gerar_musica' exact component={GenerateMusic} />
      <Route path='/playlist_dia' exact component={RandomPlaylist} />
      <Route path='/playlist_usuario' exact component={UserPlaylist} />
    </React.Fragment>
  );
}
