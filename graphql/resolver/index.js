const userResolver = require('./user.resolver')
const iconResolver = require('./icon.resolver')

module.exports = {
    ...userResolver,
    ...iconResolver
}