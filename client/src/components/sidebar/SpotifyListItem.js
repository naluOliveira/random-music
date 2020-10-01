import React, { Component } from 'react';

class SpotifyListItem extends Component {
  state = {
    href: '/auth/spotify',
    key: '13',
    icon: 'spotify',
    text: 'Entrar com Spotify',
  };

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      if (this.props.isLoggedIn) {
        this.setState({
          href: '/api/logout',
          key: '12',
          icon: 'log out',
          text: 'Logout',
        });
      }
    }
  }

  render() {
    const { href, key, icon, text } = this.state;

    return (
      <a href={href}>
        <li className='list-item' key={key}>
          <div className='list-item-content list-item-content--style'>
            <i className={`ui ${icon} inverted circular icon`} />
            <div className='list-content--toggle'>{text}</div>
          </div>
        </li>
      </a>
    );
  }
}

export default SpotifyListItem;
