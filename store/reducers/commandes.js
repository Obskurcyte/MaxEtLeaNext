import {GET_COMMANDES} from "../actions/commandes";


const initialState = {
  commandes: []
};

const commandeReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_COMMANDES:
      return {
        ...state,
        blogs: action.commandes
      }
    default:
      return state
  }
}

export default commandeReducer;
