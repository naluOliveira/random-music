import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pagination from '../playlist/Pagination';
import EmbedPlayer from '../player/EmbedPlayer';

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
        <Pagination
          userPlaylist={this.props.playlist}
          getElementInfo={this.getElementInfo}
          itemId={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { playlist: state.randomPlaylist };
};
export default connect(mapStateToProps, {})(RandomPlaylist);
