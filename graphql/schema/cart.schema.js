module.exports = `
    type Cart {
        user: User!
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