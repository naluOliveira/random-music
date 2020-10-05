import React, { Component } from 'react';

import RemoveItem from './RemoveItem';

class Playlist extends Component {
  transformDate = (date) => {
    let newDate = '';
    let elem = '';
    for (let i = 0; i < date.length; i++) {
      if (date[i] === '-') {
        newDate = '/' + elem + newDate;
        elem = '';
      } else {
        elem += date[i];
      }
    }
    return elem + newDate;
  };

  playlistItem = () => {
    const { playlistItem, getElementInfo, noIcon, removeBtn } = this.props;

    return playlistItem.map((elem, i) => {
      return (
        <li
          className='list-item list-item-playlist'
          key={i}
          onClick={() => {
            this.props.itemId
              ? getElementInfo(elem.trackId)
              : getElementInfo(elem.artistId, elem.playlistId);
          }}
        >
          {elem.date ? (
            <div className='date'>{this.transformDate(elem.date)}</div>
          ) : null}
          <img
            src={elem.imageURL}
            alt='Capa do album da música'
            width='40px'
          ></img>
          {removeBtn ? <RemoveItem elemId={elem.trackId} index={i} /> : null}
          <i
            className='ui play circle large icon'
            style={noIcon ? { display: 'none' } : {}}
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
