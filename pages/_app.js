import '../styles/globals.css';
import '../styles/index.css';
import '../styles/footer.css';
import '../styles/playboard.css';
import '../styles/xylophone.css';
import '../styles/cartItem.css';
import '../styles/contact.css';
import '../styles/checkout.css';
import '../styles/blogs.css';
import '../styles/pageBlog.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../i18n';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import productReducer from "../store/reducers/product";
import blogReducer from "../store/reducers/blog";
import commandeReducer from "../store/reducers/commandes";
import {AppProvider} from "../components/context/AppContext";
import React from "react";
import { ApolloProvider } from '@apollo/client/react';
import client from "../components/ApolloClient";

const rootReducer = combineReducers({
  product: productReducer,
  blog: blogReducer,
  commande: commandeReducer
});


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function MyApp({ Component, pageProps }) {
  return(
    <AppProvider>
      <ApolloProvider client={client}>
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
      </ApolloProvider>
    </AppProvider>
  )
}

export default MyApp
