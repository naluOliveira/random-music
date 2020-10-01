import React, { Component } from 'react';

class SpotifyListItem extends Component {
  renderListItem = () => {
    if (this.props.isLoggedIn) {
      return (
        <a href='/api/logout'>
          <li className='list-item' key='12'>
            <div className='list-item-content list-item-content--style'>
              <i className={`ui log out circular inverted icon`} />
              <div className='list-content--toggle'>Logout</div>
            </div>
          </li>
        </a>
      );
    }

    return (
      <a href='/auth/spotify'>
        <li className='list-item' key='13'>
          <div className='list-item-content list-item-content--style'>
            <i className={`ui spotify inverted circular icon`} />
            <div className='list-content--toggle'>Entrar com Spotify</div>
          </div>
        </li>
      </a>
    );
  };

  render() {
    return <React.Fragment>{this.renderListItem()}</React.Fragment>;
  }
}

export default SpotifyListItem;
