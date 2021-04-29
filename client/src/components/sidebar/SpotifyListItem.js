import React, { useState, useEffect } from 'react';

const loggedInDefaultState = {
  href: '/api/logout',
  key: '12',
  icon: 'log out',
  text: 'Logout',
};

const loggedOutDefaultState = {
  href: '/auth/spotify',
  key: '13',
  icon: 'spotify',
  text: 'Entrar com Spotify',
};

export default function SpotifyListItem({ isLoggedIn }) {
  const [data, setData] = useState(
    isLoggedIn ? loggedInDefaultState : loggedOutDefaultState
  );
  const { href, key, icon, text } = data;

  useEffect(() => {
    setData(isLoggedIn ? loggedInDefaultState : loggedOutDefaultState);
  }, [isLoggedIn]);

  return (
    <a href={href} data-testid='meuteste'>
      <li className='list-item' key={key}>
        <div className='list-item-content list-item-content--style'>
          <i className={`ui ${icon} inverted circular icon`} />
          <div className='list-content--toggle'>{text}</div>
        </div>
      </li>
    </a>
  );
}
