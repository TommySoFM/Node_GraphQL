const { buildSchema } = require('graphql');

const { mergeTypes } = require('merge-graphql-schemas')
const userSchema = require('./user.schema')
const iconSchema = require('./icon.schema')
const cartSchema = require('./cart.schema')

const types = [
    userSchema,
    iconSchema,
    cartSchema
]

module.exports = buildSchema( mergeTypes(types, { all: true }) )