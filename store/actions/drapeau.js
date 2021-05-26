export const GET_DRAPEAU = 'GET_DRAPEAU';

export const getDrapeau = (url) => {
  return async dispatch => {
    const drapeau = url;
    dispatch({
      type: GET_DRAPEAU,
      drapeau,
    })
  }
}


