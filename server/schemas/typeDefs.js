const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Drink {
    _id: ID!
    name: String!
    description: String!
    sizeOptions: [Size!]!
    image: String!
  }
  
  type Size {
    _id: ID!
    size: String!
    price: Float!
  }
  
  type User {
    _id: ID!
    name: String
    email: String!
    orders: [Orders]
  }
  
  type Orders {
    _id: ID
    purchaseDate: String
    drinks: [Drink]
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    drinks: [Drink]
    drink(drinkId: ID!): Drink
    sizes: [Size]
    user(name: String!): User
    order(_id: ID!): Orders
  }
  
  type Mutation {
    addUser(name: String, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOrder(drinks: [ID]!): Orders
    removeDrinkFromOrder(drinkId: ID!): Orders
  }`;

module.exports = typeDefs;