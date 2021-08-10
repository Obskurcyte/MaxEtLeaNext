/*import gql from "graphql-tag";
import client from "../../components/ApolloClient";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_LOCAL = "GET_PRODUCTS_LOCAL";

const PRODUCTS_QUERY = gql `query GetProducts {
  products {
    nodes {
    ... on SimpleProduct {
        id
        name
        description
        price
        slug
        featuredImage {
          node {
            uri
            title
            srcSet
            sourceUrl
          }
        }
        galleryImages {
          nodes {
            uri
            title
            srcSet
            sourceUrl
          }
        }
      }
    }
  }
}`;



export const getProducts = () => {
  return async dispatch => {
    const result = await client.query({query: PRODUCTS_QUERY});
    const product = result.data.products.nodes;
    dispatch({
      type: GET_PRODUCTS,
      product,
    })
    }
};

/*export const getProductsLocal = () => {
  return dispatch => {
    if ( process.browser) {
      let cartData = localStorage.getItem('woo-next-cart');
      cartData = null !== cartData ? JSON.parse(cartData) : '';
      dispatch({
        type: GET_PRODUCTS_LOCAL,
        productsLocal: cartData
      })
    }
  }
}

 */
