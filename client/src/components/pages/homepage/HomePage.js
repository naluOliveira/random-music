import React from 'react';
import { useSelector } from 'react-redux';

import HomePageText from './HomePageText';
import HomePageRandomMusic from './HomePageRandomMusic';

export default function HomePage() {
  const randomMusic = useSelector((state) => state.randomMusic);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
