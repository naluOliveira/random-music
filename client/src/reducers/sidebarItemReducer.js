const sidebarItemReducer = () => {
  return [
    {
      content: 'Início',
      linkTo: '/',
      iconName: 'home',
    },
    {
      content: 'Gerar música',
      linkTo: '/gerar_musica',
      iconName: 'music',
    },
    {
      content: 'Músicas Aleatórias do Dia',
      linkTo: '/playlist_dia',
      iconName: 'bars',
    },
    {
      content: 'Minhas músicas geradas',
      linkTo: '/playlist_usuario',
      iconName: 'user outline',
    },
  ];
};

export default sidebarItemReducer;
