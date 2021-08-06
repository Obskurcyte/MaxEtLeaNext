/*import { gql } from '@apollo/client';
import client from "../../components/ApolloClient";

export const GET_COUPONS = "COUPONS_QUERY";

const COUPONS_QUERY = gql `query MyQuery {
    coupons(first: 10) {
      nodes {
        code
      }
    }
    categories {
      nodes {
        id
        name
      }
    }
  }
  
  `;

  /*
  
query GetAllCoupons {
    coupons {
      nodes {
        amount
        dateExpiry
        usageLimit
        usageCount
        freeShipping
        discountType
        code
        metaData(keysIn: "affwp_discount_affiliate") {
          value
          key
        }
      }
    }
  }


  export async function getCoupons() {
    const data = await client.query({
      query: COUPONS_QUERY
    });
    console.log(data);
    return data;
}



/*export const getCoupons = () => {
  return async dispatch => {
    const result = await client.query({query: COUPONS_QUERY});
    const coupon = result.data.products.nodes;
    dispatch({
      type: GET_COUPONS,
      coupon,
    })
    }
};

export const getCoupons = () => {
    const { data, loading, error } = useQuery(COUPONS_QUERY);
    return data;
  }*/
