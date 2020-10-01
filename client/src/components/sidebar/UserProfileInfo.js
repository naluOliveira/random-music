import React, { Component } from 'react';
import { connect } from 'react-redux';
import blankProfile from '../../images/blank-profile-picture.png';

class UserProfileInfo extends Component {
  render() {
    const { imageUrl, displayName } = this.props.userInfo;
    return (
      <div className='user-profile'>
        <img
          className='user-profile user-profile--image'
          src={imageUrl ? imageUrl : blankProfile}
          alt='Foto do perfil do usuário'
        />
        <p className='user-profile user-profile--name'>{displayName}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userInfo: state.auth };
};

export default connect(mapStateToProps, {})(UserProfileInfo);
