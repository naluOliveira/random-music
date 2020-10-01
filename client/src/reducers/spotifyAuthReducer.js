const _INITIAL_STATE = {
  isLoggedIn: null,
  displayName: '',
  imageUrl: '',
};

export default (state = _INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_USER_INFO':
      return ({ ...state } = action.payload);
    default:
      return state;
  }
};
