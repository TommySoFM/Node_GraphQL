module.exports = `
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
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
    type Query {
        users: [User!]!
        user (name: String!): User!
        login (name: String!, password: String!): LoginResponse!
    }
    
    type Mutation {
        createUser (userInput: UserInput): User
    }
`