module.exports= `
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
    input IconInput {
        name: String!
        origin: String!
        price: Float!
        picture: String!
        discount_value: Float
        discount_unit: String
        discount_target: String
    }

    type Query {
        icons: [Icon!]!
        icon (name: String!): Icon!
    }

    type Mutation {
        createIcon (iconInput: IconInput): Icon!
    }
`