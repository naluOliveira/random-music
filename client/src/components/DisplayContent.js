import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

import {
  getUserInfo,
  getRandomPlaylist,
  getRandomMusicResponse,
} from '../actions';
import VerticalSidebar from './sidebar/VerticalSidebar';

class DisplayContent extends Component {
  componentDidMount() {
    const {
      getUserInfo,
      getRandomPlaylist,
      getRandomMusicResponse,
    } = this.props;

    getUserInfo();
    getRandomPlaylist();
    getRandomMusicResponse();
  }

  render() {
    return (
      <main className='w3-row'>
        <BrowserRouter>
          <VerticalSidebar />
          <section>
            <Routes />
          </section>
        </BrowserRouter>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return { userInfo: state.auth };
};

export default connect(mapStateToProps, {
  getUserInfo,
  getRandomPlaylist,
  getRandomMusicResponse,
})(DisplayContent);
