import React from 'react';

import SidebarItem from './SidebarItem';
import UserProfileInfo from './UserProfileInfo';

export default function VerticalSidebar() {
  return (
    <nav className='w3-col sidebar'>
      <UserProfileInfo />
      <SidebarItem />
    </nav>
  );
}
