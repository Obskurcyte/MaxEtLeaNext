import gql from "graphql-tag";
import client from "../../components/ApolloClient";
import {GET_BLOG} from "./blog";


export const GET_COMMANDES = 'GET_COMMANDES';
export const CREATE_COMMANDE = 'CREATE_COMMANDE';
const userID = localStorage.getItem('userID');
const prenom = localStorage.getItem('prenom')
const nom = localStorage.getItem('nom')
const adresse = localStorage.getItem('adresse')
const postalcode = localStorage.getItem('postalcode')
const ville = localStorage.getItem('ville')
const pays = localStorage.getItem('pays')
const phone = localStorage.getItem('phone')
const email = localStorage.getItem('email')

const COMMANDES_QUERY = gql `query GetOrdersForUser {
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

const CREATE_COMMANDE_MUTATION = gql `mutation CreateOrder {
  __typename
  createOrder(input: {status: PROCESSING, shipping: {address1: "${adresse}", city: "${ville}", email: "${email}", country: FR, firstName: "${prenom}", lastName: "${nom}", phone: "${phone}", postcode: "${postalcode}", state: "Essone"}, billing: {address1: "${adresse}", city: "${ville}", address2: "", country: FR, company: "", email: "${email}", firstName: "${prenom}", lastName: "${nom}", overwrite: true, phone: "${phone}", postcode: "${postalcode}", state: "Essone"}, lineItems: {productId: 3163, quantity: 2, total: "10", subtotal: "5"}, isPaid: true, feeLines: {amount: "15", total: "15"}, paymentMethod: "cod", shippingLines: {methodId: "cod", methodTitle: "Paiement à la livraison", total: "5"}, customerId: ${userID}}) {
    orderId
  }
}`

export const createCommande = () => {
  return async dispatch => {
    const result = await client.mutate({mutation: CREATE_COMMANDE_MUTATION});
    const commande_created = result.data;
    console.log(commande_created)
    dispatch({
      type: CREATE_COMMANDE,
      commande_created,
    })
  }
}


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

