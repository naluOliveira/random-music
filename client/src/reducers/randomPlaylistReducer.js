export default (state = [], action) => {
  switch (action.type) {
    case 'GET_RANDOM_PLAYLIST':
      return ([...state] = action.payload);

    default:
      return state;
  }
};
