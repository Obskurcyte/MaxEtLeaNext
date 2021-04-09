import gql from "graphql-tag";
import client from "../../components/ApolloClient";

export const GET_USER = "GET_USER";

const USER_QUERY = gql `mutation {
  createUser(input: {
    "username": "anotherNewUser",
    "email": "another_new_user@example.com"
  }) {
    user {
      id
      name
    }
  }
}`


