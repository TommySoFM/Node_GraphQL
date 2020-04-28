module.exports = `
type Bill {
    _id: ID!
    user: User!
    items: [Item]
    createdAt: String!
}

type Mutation {
    addToBill: Bill!
}
`