// Temp example for now, until I get full back-end stuff
import gql from 'graphql-tag';

//! DOUBLE CHECK BACKEND QUERIES and MODELS. HIGHLY LIKELY TO CHANGE
//! THESE ARE JUST A TEMP for NOW
export const GET_SINGLE_USER = gql`
  query GetSingleUser($id: ID!) {
    user(id: $id) {
      id
      email
      username
      drinkOrders {
        id
        drinkName
        quantity
        date
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      id
      email
      username
      drinkOrders {
        id
        drinkName
        quantity
        date
      }
    }
  }
`;
