import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import GenerateMusic from './generateMusic/GenerateMusic';
import RandomPlaylist from './pages/RandomPlaylist';
import UserPlaylist from './pages/UserPlaylist';

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path='/' exact component={HomePage} />
        <Route path='/gerar_musica' exact component={GenerateMusic} />
        <Route path='/playlist_dia' exact component={RandomPlaylist} />
        <Route path='/playlist_usuario' exact component={UserPlaylist} />
      </React.Fragment>
    );
  }
}

export default Routes;
