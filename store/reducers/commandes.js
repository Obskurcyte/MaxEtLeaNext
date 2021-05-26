import {GET_COMMANDES} from "../actions/commandes";
import {GET_CART} from "../actions/commandes";
import {SET_CART} from "../actions/commandes";

const initialState = {
  commandes: [],
  cart: {}
};

const commandeReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_COMMANDES:
      return {
        ...state,
        blogs: action.commandes
      }
    case SET_CART:
      return {
        ...state,
        cart: action.cart
      }
    case GET_CART:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default commandeReducer;
