import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SpotifyListItem from './SpotifyListItem';

export default function SidebarItem() {
  const items = useSelector((state) => state.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <ul className='list'>
      {items.map((item, i) => {
        return (
          <Link to={item.linkTo} key={i}>
            <li className='list-item'>
              <div className='list-item-content list-item-content--style'>
                <i className={`ui ${item.iconName} circular inverted icon`} />
                <div className='list-content--toggle'>{item.content}</div>
              </div>
            </li>
          </Link>
        );
      })}
      <SpotifyListItem isLoggedIn={isLoggedIn} />
    </ul>
  );
}
