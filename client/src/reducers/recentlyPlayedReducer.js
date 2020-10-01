export default (state = [], action) => {
  switch (action.type) {
    case 'RECENTLY_PLAYED':
      return ([...state] = action.payload);

    default:
      return state;
  }
};
