import React from 'react';

export default function LogInOption() {
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
