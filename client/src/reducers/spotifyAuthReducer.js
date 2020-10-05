const _INITIAL_STATE = {
  spotifyID: '',
  isLoggedIn: null,
  displayName: '',
  imageUrl: '',
  generatedMusics: [],
};

export default (state = _INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_USER_INFO':
      return ({ ...state } = action.payload);
    case 'GET_GENERATED_PLAYLIST':
      return {
        ...state,
        generatedMusics: ([...state.generatedMusics] = action.payload),
      };
    default:
      return state;
  }
};
