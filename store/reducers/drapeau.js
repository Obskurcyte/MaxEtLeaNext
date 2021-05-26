import {GET_DRAPEAU} from "../actions/drapeau";

const initialState = {
  drapeau : 'https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png'
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
