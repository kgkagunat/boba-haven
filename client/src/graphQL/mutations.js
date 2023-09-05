// utils/mutations.js
import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($email: String!, $password: String!, $name: String!) {
    addUser(email: $email, password: $password, name: $name) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation Login($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const ADD_ORDER = gql`
mutation AddOrder($drinks: [OrderInputDrink!]!) {
    addOrder(drinks: $drinks) {
      _id
      user
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

export const ADD_DRINK_TO_EXISTING_ORDER = gql`
mutation AddDrinkToExistingOrder($orderId: ID!, $addDrinkToExistingOrderDrinkId: ID!, $quantity: Int!, $size: String!) {
    addDrinkToExistingOrder(orderId: $orderId, drinkId: $addDrinkToExistingOrderDrinkId, quantity: $quantity, size: $size) {
      _id
      user
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

export const UPDATE_DRINK_QUANTITY_IN_ORDER = gql`
mutation UpdateDrinkQuantityInOrder($updateDrinkQuantityInOrderOrderId: ID!, $updateDrinkQuantityInOrderDrinkId: ID!, $newQuantity: Int!) {
    updateDrinkQuantityInOrder(orderId: $updateDrinkQuantityInOrderOrderId, drinkId: $updateDrinkQuantityInOrderDrinkId, newQuantity: $newQuantity) {
      _id
      drinks {
        drink {
          _id
          name
        }
        quantity
        priceAtOrderTime
      }
    }
  }
`;

export const UPDATE_DRINK_SIZE_IN_ORDER = gql`
mutation UpdateDrinkSizeInOrder($updateDrinkSizeInOrderOrderId: ID!, $updateDrinkSizeInOrderDrinkId: ID!, $newSize: String!) {
    updateDrinkSizeInOrder(orderId: $updateDrinkSizeInOrderOrderId, drinkId: $updateDrinkSizeInOrderDrinkId, newSize: $newSize) {
      _id
      drinks {
        drink {
          _id
          name
        }
        size
        priceAtOrderTime
      }
    }
  }
`;

export const REMOVE_DRINK_FROM_ORDER = gql`
mutation RemoveDrinkFromOrder($removeDrinkFromOrderOrderId2: ID!, $removeDrinkFromOrderDrinkId2: ID!) {
    removeDrinkFromOrder(orderId: $removeDrinkFromOrderOrderId2, drinkId: $removeDrinkFromOrderDrinkId2) {
      _id
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