import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRandomMusicResponse } from '../../../actions';
import HomePageText from './HomePageText';
import HomePageRandomMusic from './HomePageRandomMusic';

class HomePage extends Component {
  render() {
    const { isLoggedIn, randomMusic } = this.props;
    return (
      <section>
        <HomePageText />
        <HomePageRandomMusic
          id={randomMusic.trackId}
          name={randomMusic.name}
          artist={randomMusic.artist}
          isLoggedIn={isLoggedIn}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    randomMusic: state.randomMusic,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, {
  getRandomMusicResponse,
})(HomePage);
