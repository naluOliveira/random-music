import React, { Component } from 'react';

class Playlist extends Component {
  playlistItem = () => {
    const { playlistItem, getElementInfo } = this.props;

    return playlistItem.map((elem, i) => {
      return (
        <li
          className='list-item list-item-playlist'
          key={i}
          onClick={() => {
            this.props.itemId
              ? getElementInfo(elem.trackId)
              : elem.artistId
              ? getElementInfo(elem.artistId)
              : getElementInfo(elem.playlistId);
          }}
        >
          <img
            src={elem.imageURL}
            alt='Capa do album da música'
            width='40px'
          ></img>
          <i
            className='ui play circle large icon'
            style={this.props.noIcon ? { display: 'none' } : {}}
          ></i>
          <div className='list-item-playlist-content'>
            <div className='list-item-name'>{elem.name}</div>
            <div className='list-item-artist'>
              {elem.artist ? elem.artist : elem.owner}
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <section className='playlist-container'>
        <div className='playlist-title'>
          <h2 className='playlist-title-content'>{this.props.title}</h2>
        </div>
        <div className='playlist-content'>
          <ul>{this.playlistItem()}</ul>
        </div>
      </section>
    );
  }
}

export default Playlist;
