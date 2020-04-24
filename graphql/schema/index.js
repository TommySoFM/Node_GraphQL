const { buildSchema } = require('graphql');

module.exports = buildSchema (`
type User {
    _id: ID!
    name: String!
    email: String!
    password: String
}

type Icon {
    _id: ID!
    name: String!
    origin: String!
    price: Float!
    picture: String!
    discount: Discount
}

type Discount {
    value: Float!
    unit: String!
    target: String
}

type LoginResponse {
    userID: ID!
    token: String!
    expiration: String!
}

input UserInput {
    name: String!
    email: String!
    password: String!
}

input IconInput {
    name: String!
    origin: String!
    price: Float!
    picture: String!
    discount_value: Float
    discount_unit: String
    discount_target: String
}

type RootQuery {
    users: [User!]!
    user (name: String!): User!
    login (name: String!, password: String!): LoginResponse!
    icons: [Icon!]!
    icon (name: String!): Icon!
}

type RootMutation {
    createUser (userInput: UserInput): User
    createIcon (iconInput: IconInput): Icon!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)