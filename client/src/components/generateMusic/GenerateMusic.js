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
  };

  handleClick = async (list) => {
    const { recentlyPlayed, userSavedPlaylist } = this.state;

    if (recentlyPlayed.length !== 0 && userSavedPlaylist.length !== 0)
      return this.setState({ pickPlaylist: list });

    await this.props.getUserPlaylist(list);

    this.setState(() => {
      if (list === 'Playlists Salvas') {
        return {
          pickPlaylist: list,
          userSavedPlaylist: this.props.playlists,
        };
      }
      return { pickPlaylist: list, recentlyPlayed: this.props.playlists };
    });
  };

  renderPlaylist = () => {
    const { pickPlaylist, recentlyPlayed, userSavedPlaylist } = this.state;

    if (!pickPlaylist) return null;

    let playlist =
      pickPlaylist === 'Playlists Salvas' ? userSavedPlaylist : recentlyPlayed;

    return (
      <Playlist
        playlistItem={playlist}
        title={this.state.pickPlaylist}
        getElementInfo={(artistId, playlistId) =>
          this.props.getRelatedArtist(artistId, playlistId)
        }
        noIcon={true}
      />
    );
  };

  embedPlayer = () => {
    const { trackId } = this.props.relatedArtist;
    console.log(this.props.relatedArtist);
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
  };
};

export default connect(mapStateToProps, {
  getUserPlaylist,
  getRelatedArtist,
})(GenerateMusic);
