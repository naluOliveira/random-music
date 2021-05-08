import React from 'react';

import EmbedPlayer from '../../player/EmbedPlayer';

export default function SelectPlaylist({ trackId, handleClick, loading }) {
  const embedPlayer = () => {
    if (loading) {
      return (
        <div className='generate-music-icon'>
          <i className='ui spinner loading large icon' />
          <div>Buscando uma música para você</div>
        </div>
      );
    }

    return trackId ? (
      <div className='musica gerada'>
        <p>A música gerada foi: </p>
        <EmbedPlayer id={trackId} />
        <p>
          Lembrando que você pode acessar todas as suas músicas salvas em
          "Minhas músicas geradas"
        </p>
      </div>
    ) : null;
  };

  return (
    <div className='w3-col homepage homepage-container generate'>
      <div className='homepage-right-content-text'>
        <h2>Gerar música</h2>
        <br />
        <p>
          Você pode gerar uma música baseada nas suas playlists salvas ou
          músicas recém tocadas.
        </p>
        <p>
          É só escolher uma das opções abaixo e selecionar a playlist ou música
          desejada e pronto! A música gerada irá aparecer aqui embaixo :)
        </p>
        <br />
        <button
          className='generate-music-btn'
          onClick={() => handleClick('Playlists Salvas')}
        >
          Playlists salvas
        </button>
        <button
          className='generate-music-btn'
          onClick={() => handleClick('Recém tocadas')}
        >
          Músicas recém tocadas
        </button>
        {embedPlayer()}
      </div>
    </div>
  );
}
