const userResolver = require('./user.resolver')
const iconResolver = require('./icon.resolver')
const cartResolver = require('./cart.resolver')
const billResolver = require('./bill.resolver')
const billboardResolver = require('./billboard.resolver')

module.exports = {
    ...userResolver,
    ...iconResolver,
    ...cartResolver,
    ...billResolver,
    ...billboardResolver
}