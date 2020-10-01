const _INITIAL_STATE = {
  id: null,
  name: '',
  artist: '',
  imageURL: [],
  url: '',
};

export default (state = _INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_RANDOM_MUSIC':
      return ({ ...state } = action.payload);
    default:
      return state;
  }
};
