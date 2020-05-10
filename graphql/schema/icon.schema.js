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
        percentage: Float!
        unit: String!
        to: String
        target: String
    }
    input IconInput {
        name: String!
        origin: String!
        price: Float!
        picture: String!
        discount_percentage: Float
        discount_minQuantity: Float
        discount_to: String
        discount_target: String
    }
    input DiscountInput {
        percentage: Float!
        minQuantity: Float!
        to: String
        target: String
    }


    type Query {
        icons: [Icon!]!
        icon (name: String!): Icon!
        searchIcon (keyword: String!, method: String!, number: Int): [Icon!]
    }

    type Mutation {
        createIcon (iconInput: IconInput): Icon!
        changeDiscount (iconID: String, discount: DiscountInput): Icon!
    }    
`    