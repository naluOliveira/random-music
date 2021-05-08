import React from 'react';

export default function EmbedPlayer({ id }) {
  return (
    <div className='homepage-right-container'>
      <section>
        <iframe
          src={`https://open.spotify.com/embed/track/${id}`}
          className='embed-player'
          title='embedPlayer'
          frameBorder='0'
          allowtransparency='true'
          allow='encrypted-media'
        ></iframe>
      </section>
    </div>
  );
}
