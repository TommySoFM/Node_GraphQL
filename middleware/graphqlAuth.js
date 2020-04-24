const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"]
    if(!token){
        req.isTokenExist = false
        next()
    } else{
        req.isTokenExist = true
        try {
            const decoded = jwt.verify(token, config.get('myprivatekey'))
            req.user = decoded
            next()
        } catch(error){
            throw new Error('Error parsing token.')
        }
    }
}