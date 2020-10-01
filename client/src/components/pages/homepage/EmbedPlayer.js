import React, { Component } from 'react';

class EmbedPlayer extends Component {
  render() {
    return (
      <div className='homepage-right-container'>
        <section>
          <iframe
            src={`https://open.spotify.com/embed/track/${this.props.id}`}
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
}

export default EmbedPlayer;
