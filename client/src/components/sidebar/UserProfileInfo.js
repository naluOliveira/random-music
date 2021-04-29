import React from 'react';
import { useSelector } from 'react-redux';
import blankProfile from '../../images/blank-profile-picture.png';

export default function UserProfileInfo() {
  const { imageUrl, displayName } = useSelector((state) => state.auth);

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
