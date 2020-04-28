const { buildSchema } = require('graphql');

const { mergeTypes } = require('merge-graphql-schemas')
const userSchema = require('./user.schema')
const iconSchema = require('./icon.schema')
const cartSchema = require('./cart.schema')
const billSchema = require('./bill.schema')

const types = [
    userSchema,
    iconSchema,
    cartSchema,
    billSchema
]

module.exports = buildSchema( mergeTypes(types, { all: true }) )