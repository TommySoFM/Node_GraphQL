module.exports = `
    type Cart {
        owner: User!
        items: [Item]
    }

    type Item {
        icon: Icon!
        quantity: Int!
    }

    type Query {
        cart: Cart!
    }

    type Mutation {
        addToCart (itemID: ID!, quantity: Int!): Cart!
        emptyCart: String!
    }
`