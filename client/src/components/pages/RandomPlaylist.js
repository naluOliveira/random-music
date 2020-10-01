import React, { Component } from 'react';
import { connect } from 'react-redux';

import Playlist from '../playlist/Playlist';
import EmbedPlayer from '../pages/homepage/EmbedPlayer';

class RandomPlaylist extends Component {
  state = { elemId: '' };

  getElementInfo = (elemId) => {
    this.setState({ elemId: elemId });
  };

  render() {
    return (
      <div className='w3-col homepage-container random-playlist-container'>
        <div className='title'>
          <h2>Playlist de músicas aleatórias do dia</h2>
        </div>
        {this.state.elemId ? <EmbedPlayer id={this.state.elemId} /> : null}
        <Playlist
          playlistItem={this.props.playlist}
          itemId={true}
          getElementInfo={this.getElementInfo}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { playlist: state.randomPlaylist };
};
export default connect(mapStateToProps, {})(RandomPlaylist);
