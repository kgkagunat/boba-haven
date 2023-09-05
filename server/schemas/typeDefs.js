const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Drink {
  _id: ID!
  name: String!
  description: String!
  prices: Prices!
  image: String!
}

type Prices {
  small: Float!
  medium: Float!
  large: Float!
}

type User {
  _id: ID!
  name: String
  email: String!
  orders: [Order]
}

type Order {
  _id: ID!
  user: ID!
  purchaseDate: String
  drinks: [OrderDrink]
}

type OrderDrink {
  drink: Drink!
  quantity: Int!
  size: String!
  priceAtOrderTime: Float!
}

type Auth {
  token: ID!
  user: User
}

type Checkout {
  session: ID
}

type PaymentResponse {
  success: Boolean!
  message: String!
}

type Payment {
  _id: ID!
  user: ID!
  paymentMethodId: String!
  amount: Float!
  status: String!
  createdAt: String!
}

type Query {
  drinks: [Drink]
  drink(drinkId: ID!): Drink
  user(userId: ID!): User
  order(_id: ID!): Order
  me: User
  payments: [Payment]
  payment(paymentId: ID!): Payment
}

type Mutation {
  addUser(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addOrder(drinks: [OrderInputDrink!]!): Order
  addDrinkToExistingOrder(orderId: ID!, drinkId: ID!, quantity: Int!, size: String!): Order
  updateDrinkSizeInOrder(orderId: ID!, drinkId: ID!, newSize: String!): Order
  updateDrinkQuantityInOrder(orderId: ID!, drinkId: ID!, newQuantity: Int!): Order
  removeDrinkFromOrder(orderId: ID!, drinkId: ID!): Order
  checkout(drinks: [OrderInputDrink!]!): Checkout
  processStripePayment(paymentMethodId: String!, amount: Float!): PaymentResponse!
}

input OrderInputDrink {
  drinkId: ID!
  quantity: Int!
  size: String!
}
`;

module.exports = typeDefs;