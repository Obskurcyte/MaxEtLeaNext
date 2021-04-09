import {GET_PRODUCTS} from '../actions/product';
import {GET_PRODUCTS_LOCAL} from "../actions/product";

const initialState = {
  products: [],
  productsLocal: []
}


const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS :
      return {
        ...state,
        products: action.product
      }
    case GET_PRODUCTS_LOCAL :
      return {
        ...state,
        productsLocal: action.productsLocal
      }
  }
  return state

}

export default productReducer
