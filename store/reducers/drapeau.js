import {GET_DRAPEAU} from "../actions/drapeau";

const initialState = {
  drapeau : '/flagfr.png'
}


const drapeauReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRAPEAU :
      return {
        ...state,
        drapeau: action.drapeau
      }
  }
  return state
}


export default drapeauReducer;
