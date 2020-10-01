export default (state = {}, action) => {
  switch (action.type) {
    case 'RELATED_ARTIST':
      return ({ ...state } = action.payload);

    case 'RELATED_PLAYLIST':
      return ({ ...state } = action.payload);

    default:
      return state;
  }
};
