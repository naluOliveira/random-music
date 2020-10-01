import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getElementInfo } from '../../actions';
import Playlist from '../playlist/Playlist';
import EmbedPlayer from '../pages/homepage/EmbedPlayer';

class RandomPlaylist extends Component {
  getElementInfo = (elemId) => {
    this.props.getElementInfo(elemId);
  };

  render() {
    return (
      <div className='w3-col homepage-container random-playlist-container'>
        <div className='title'>
          <h2>Playlist de músicas aleatórias do dia</h2>
        </div>
        {this.props.playTrack ? (
          <EmbedPlayer id={this.props.playTrack} />
        ) : null}
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
  return { playlist: state.randomPlaylist, playTrack: state.playTrack };
};
export default connect(mapStateToProps, { getElementInfo })(RandomPlaylist);
