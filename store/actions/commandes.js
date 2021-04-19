import gql from "graphql-tag";
import client from "../../components/ApolloClient";
import {GET_BLOG} from "./blog";


export const GET_COMMANDES = 'GET_COMMANDES';
export const CREATE_COMMANDE = 'CREATE_COMMANDE';




/*const COMMANDES_QUERY = gql `query GetOrdersForUser {
  orders(where: {customerId: ${userID}}) {
    nodes {
      billing {
        address1
        address2
        city
        country
        company
        email
        firstName
        lastName
        phone
        postcode
      }
      lineItems {
        nodes {
          product {
            name
          }
          subtotal
          total
        }
      }
      shipping {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
      }
      shippingLines {
        nodes {
          shippingMethod {
            title
            description
          }
        }
      }
      shippingTotal
      subtotal
      total
    }
  }
}`;


export const getCommandes = () => {
  return async dispatch => {
    const result = await client.query({query: COMMANDES_QUERY});
    const commandes = result.data.orders.nodes;
    console.log(commandes)
    dispatch({
      type: COMMANDES_QUERY,
      commandes,
    })
  }
};

 */


