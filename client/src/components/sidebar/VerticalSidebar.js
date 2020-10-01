import React, { Component } from 'react';

import SidebarItem from './SidebarItem';
import UserProfileInfo from './UserProfileInfo';

class VerticalSidebar extends Component {
  render() {
    return (
      <nav className='w3-col sidebar'>
        <UserProfileInfo />
        <SidebarItem />
      </nav>
    );
  }
}

export default VerticalSidebar;
