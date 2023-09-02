import { gql } from '@apollo/client';

export const GET_USER = gql`
query GetUser($name: String) {
  user(name: $name) {
    _id
    name
    email
    orders {
      _id
      user
      purchaseDate
      drinks {
        drink {
          _id
          image
        }
        quantity
        size
        priceAtOrderTime
      }
    }
  }
}
`;

export const GET_DRINKS = gql`
query GetDrinks {
  drinks {
    _id
    description
    name
    prices {
      small
      medium
      large
    }
    image
  }
}
`;

export const GET_DRINK = gql`
query GetDrink($drinkId: ID!) {
  drink(drinkId: $drinkId) {
    _id
    description
    name
    prices {
      small
      medium
      large
    }
    image
  }
}
`;

export const GET_ORDER = gql`
query GetOrder($id: ID!) {
  order(_id: $id) {
    _id
    user
    purchaseDate
    drinks {
      drink {
        _id
        name
      }
      quantity
      size
      priceAtOrderTime
    }
  }
}
`;


