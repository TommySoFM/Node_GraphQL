const userResolver = require('./user.resolver')
const iconResolver = require('./icon.resolver')
const cartResolver = require('./cart.resolver')

module.exports = {
    ...userResolver,
    ...iconResolver,
    ...cartResolver
}