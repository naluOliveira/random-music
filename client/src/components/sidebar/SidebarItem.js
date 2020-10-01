import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SpotifyListItem from './SpotifyListItem';

class SidebarItem extends Component {
  renderItems = () => {
    const { items } = this.props;

    return items.map((item, i) => {
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
    });
  };

  render() {
    return (
      <ul className='list'>
        {this.renderItems()}
        <SpotifyListItem isLoggedIn={this.props.isLoggedIn} />
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return { items: state.items, isLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps, {})(SidebarItem);
