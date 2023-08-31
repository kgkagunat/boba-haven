// Temp example for now, until I get full back-end stuff
import gql from 'graphql-tag';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;
