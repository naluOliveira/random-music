import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getUserPlaylist,
  getRecentlyPlayed,
  getRelatedArtist,
  getRelatedPlaylist,
} from '../../actions';
import Playlist from '../playlist/Playlist';
import EmbedPlayer from '../pages/homepage/EmbedPlayer';

class GenerateMusic extends Component {
  constructor() {
    super();
    this.pickPlaylist = '';
  }

  handleClick = (list) => {
    const { getUserPlaylist, getRecentlyPlayed } = this.props;

    list === 'salvas' ? getUserPlaylist() : getRecentlyPlayed();

    this.pickPlaylist = list;
  };

  renderPlaylist = () => {
    if (!this.pickPlaylist) return null;
    let playlist,
      title,
      clickFunction = null;

    if (this.pickPlaylist === 'salvas') {
      playlist = this.props.playlists;
      title = 'Playlists Salvas';
      clickFunction = this.props.getRelatedPlaylist;
    } else {
      playlist = this.props.recentlyPlayed;
      title = 'Recém tocadas';
      clickFunction = this.props.getRelatedArtist;
    }

    return (
      <Playlist
        playlistItem={playlist}
        title={title}
        getElementInfo={(playlistId) => clickFunction(playlistId)}
        noIcon={true}
      />
    );
  };

  embedPlayer = () => {
    const { trackId } = this.props.relatedArtist;

    return trackId ? (
      <div>
        <p>A música gerada foi: </p>
        <EmbedPlayer id={trackId} />
      </div>
    ) : null;
  };

  render() {
    return (
      <section>
        <div className='w3-col homepage homepage-container'>
          <div className='homepage-right-content-text'>
            <h2>Gerar música</h2>
            <br />
            <p>
              Você pode gerar uma música baseada nas suas playlists salvas ou
              músicas recém tocadas.
            </p>
            <p>
              É só escolher uma das opções abaixo e selecionar a playlist ou
              música desejada e pronto! A música gerada irá aparecer aqui
              embaixo :)
            </p>
            <br />
            <button
              className='generate-music-btn'
              onClick={() => this.handleClick('salvas')}
            >
              Playlists salvas
            </button>
            <button
              className='generate-music-btn'
              onClick={() => this.handleClick('recemTocadas')}
            >
              Músicas recém tocadas
            </button>
            {this.embedPlayer()}
          </div>
        </div>

        <div className='w3-col homepage-container user-playlist'>
          {this.renderPlaylist()}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.userPlaylist,
    recentlyPlayed: state.recentlyPlayed,
    relatedArtist: state.relatedArtist,
  };
};

export default connect(mapStateToProps, {
  getUserPlaylist,
  getRecentlyPlayed,
  getRelatedArtist,
  getRelatedPlaylist,
})(GenerateMusic);
