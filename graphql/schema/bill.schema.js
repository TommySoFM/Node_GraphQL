module.exports = `
type Bill {
    _id: ID!
    user: User!
    items: [Item]
    createdAt: String!
}

type Query {
    getBills: [Bill!]
    searchBill (keyword: String!, from: [Int!], to:[Int!]): [Bill!]
}
type Mutation {
    addToBill: String!
}
`