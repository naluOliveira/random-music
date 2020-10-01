import React, { Component } from 'react';
import EmbedPlayer from './EmbedPlayer';

class HomePageRandomMusic extends Component {
  renderPlayer = () => {
    const { isLoggedIn, id } = this.props;

    if (isLoggedIn) {
      if (id) {
        return (
          <div className='homepage-right-content-background'>
            <h4>A música de hoje é:</h4>
            <p>
              {this.props.name} - {this.props.artist}
            </p>
            <EmbedPlayer id={id} />
            <div className='homepage-right-content-text'>
              E aí? Gostou da música gerada de hoje?
              <br />
              <br />
              Se não gostou, está tudo bem! Você pode gerar músicas aleatórias
              de acordo com seu gosto. É só clicar na aba "Gerar música" aqui do
              lado.
              <br />
              Todas as músicas do dia estão salvas em "Músicas Aleatórias do
              Dia".
              <br />
              <br />
              Quem sabe você não encontra aquele estilo diferente que estava
              procurando?
            </div>
          </div>
        );
      }
      return (
        <div className='homepage-right-content'>
          <i className='ui spinner loading icon' />
          <p className='loading-text'>Carregando</p>
        </div>
      );
    }

    return (
      <div className='homepage-content homepage-right-content'>
        <p>Quer saber qual é a nossa música aleatória do dia?</p>
        <p>Faça login e descubra!</p>
        <div
          className='spotify-btn-container'
          style={isLoggedIn ? { display: 'none' } : {}}
        >
          <a
            href='/auth/spotify'
            className='spotify-btn spotify-btn-style'
            role='button'
          >
            <i className='ui large spotify icon icon-btn' />
            Entrar com Spotify
          </a>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className='w3-col homepage-container '>{this.renderPlayer()}</div>
    );
  }
}

export default HomePageRandomMusic;
