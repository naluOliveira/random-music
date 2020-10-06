import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserPlaylist, getRelatedArtist } from '../../actions';
import Playlist from '../playlist/Playlist';
import EmbedPlayer from '../pages/homepage/EmbedPlayer';

class GenerateMusic extends Component {
  state = {
    pickPlaylist: '',
    recentlyPlayed: [],
    userSavedPlaylist: [],
    loading: false,
    loadingPlaylist: false,
  };

  handleClick = async (list) => {
    const { recentlyPlayed, userSavedPlaylist } = this.state;

    this.setState({ loadingPlaylist: true });

    if (recentlyPlayed.length !== 0 && userSavedPlaylist.length !== 0)
      return this.setState({ pickPlaylist: list, loadingPlaylist: false });

    await this.props.getUserPlaylist(list);

    this.setState(() => {
      if (list === 'Playlists Salvas') {
        return {
          pickPlaylist: list,
          userSavedPlaylist: this.props.playlists,
          loadingPlaylist: false,
        };
      }
      return {
        pickPlaylist: list,
        recentlyPlayed: this.props.playlists,
        loadingPlaylist: false,
      };
    });
  };

  getElementInfo = async (artistId, playlistId) => {
    this.setState({ loading: true });
    await this.props.getRelatedArtist(artistId, playlistId);
    this.setState({ loading: false });
  };

  renderPlaylist = () => {
    const {
      pickPlaylist,
      recentlyPlayed,
      userSavedPlaylist,
      loadingPlaylist,
    } = this.state;

    if (loadingPlaylist) {
      return (
        <div className='generate-music-icon'>
          <i className='ui spinner loading large icon' />
          <div>Carregando</div>
        </div>
      );
    } else if (!pickPlaylist) {
      return null;
    }

    let playlist =
      pickPlaylist === 'Playlists Salvas' ? userSavedPlaylist : recentlyPlayed;

    return (
      <Playlist
        playlistItem={playlist}
        title={this.state.pickPlaylist}
        getElementInfo={(artistId, playlistId) => {
          this.getElementInfo(artistId, playlistId);
        }}
        noIcon={true}
      />
    );
  };

  embedPlayer = () => {
    const { trackId } = this.props.relatedArtist;

    if (this.state.loading) {
      return (
        <div className='generate-music-icon'>
          <i className='ui spinner loading large icon' />
          <div>Buscando uma música para você</div>
        </div>
      );
    }

    return trackId ? (
      <div className='musica gerada'>
        <p>A música gerada foi: </p>
        <EmbedPlayer id={trackId} />
        <p>
          Lembrando que você pode acessar todas as suas músicas salvas em
          "Minhas músicas geradas"
        </p>
      </div>
    ) : null;
  };

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div className='w3-col homepage-container random-playlist-container'>
          <div className='spotify-btn-container'>
            <a
              href='/auth/spotify'
              className='spotify-btn spotify-btn-style'
              role='button'
            >
              <i className='ui large spotify icon icon-btn' />
              Entrar com Spotify
            </a>
          </div>
        </div>
      );
    }

    return (
      <section>
        <div className='w3-col homepage homepage-container generate'>
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
              onClick={() => this.handleClick('Playlists Salvas')}
            >
              Playlists salvas
            </button>
            <button
              className='generate-music-btn'
              onClick={() => this.handleClick('Recém tocadas')}
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
    relatedArtist: state.relatedArtist,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, {
  getUserPlaylist,
  getRelatedArtist,
})(GenerateMusic);
