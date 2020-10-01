export default (state = '', action) => {
  switch (action.type) {
    case 'ELEM_INFO':
      return (state = action.payload);

    default:
      return state;
  }
};
