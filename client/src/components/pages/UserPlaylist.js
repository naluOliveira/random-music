import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserGeneratedPlaylist } from '../../actions';

import EmbedPlayer from '../player/EmbedPlayer';
import Pagination from '../playlist/Pagination';

class UserPlaylist extends Component {
  state = {
    elemId: '',
  };

  async componentDidMount() {
    if (this.props.isLoggedIn) {
      await this.props.getUserGeneratedPlaylist();
    }
  }

  getElementInfo = (elemId) => {
    this.setState({ elemId: elemId });
  };

  renderPlaylist = () => {
    if (this.props.userPlaylist.length !== 0) {
      return (
        <React.Fragment>
          {this.state.elemId ? <EmbedPlayer id={this.state.elemId} /> : null}
          <Pagination
            userPlaylist={this.props.userPlaylist}
            getElementInfo={this.getElementInfo}
            itemId={true}
            removeBtn={true}
          />
        </React.Fragment>
      );
    }

    return (
      <div className='user-generated-loading'>
        <i className='ui spinner loading large icon' />
      </div>
    );
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
      <div className='w3-col homepage-container random-playlist-container'>
        <div className='title'>
          <h2>Minhas músicas geradas</h2>
        </div>
        {this.renderPlaylist()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userPlaylist: state.auth.generatedMusics,
    isLoggedIn: state.auth.isLoggedIn,
  };
};
export default connect(mapStateToProps, { getUserGeneratedPlaylist })(
  UserPlaylist
);
