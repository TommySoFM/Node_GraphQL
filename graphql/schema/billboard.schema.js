module.exports = `
    type Billboard {
        rankItem: [RankItem!]
        timeStamp: String!
    }

    type RankItem {
        icon: Icon!
        rank: Int!
        score: Int!
    }

    type Query {
        getBillboard (number: Int!): Billboard!
    }
`