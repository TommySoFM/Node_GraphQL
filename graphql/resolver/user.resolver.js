const { User } = require('../../models/user.model')
const bcrypt = require('bcrypt')
const { AuthFilter, AdminFilter } = require('./methods')

module.exports = {
    login: async ({name, password}) => {
        try{
            const user = await User.findOne({ name: name })
            if(!user){
                throw new Error ('Authentication failed.')
            }
            const isPasswordSame =  bcrypt.compare( password, user.password)
            if (!isPasswordSame) {
                throw new Error ('Authentication failed')
            }
            const token = user.generateAuthToken()
            const currentTime = Date.now()
            const expirationTime = new Date(currentTime + 18000000)
            const datetimeFormat = {
                dateStyle: "medium",
                timeStyle: "medium",
                timeZoneName: 'short' 
            }
            return {
                userID: user.id,
                token: token,
                expiration: expirationTime.toLocaleString( "en", datetimeFormat)
            }
        } catch (error){
            throw error
        }
    },
    users: async (args, req) => {
        AuthFilter(req)
        AdminFilter(req)
        try{
            const userSet = await User.find()
            return userSet.map( user => {
                return {
                    ...user._doc,
                   _id: user.id,
                   password: null
                }
            })
        }
        catch (error){
            throw error
        }
    },
    user: async ({ name }, req) => {
        try{
            const user = await User.findOne({ name: name })
            if(!user){
                throw new Error('User not found!')
            }
            return {
                ...user._doc,
                password: null,
                _id: user.id
            }
        } catch (error){
            throw error
        }
    },
    createUser: async args => {
        try{
            const userSearch = await User.findOne({ name: args.userInput.name })
            if (userSearch) {
                throw new Error('User exist!')
            }
            const encryptedPassword = bcrypt.hash( args.userInput.password, 12)
            const user = new User({
                name: args.userInput.name,
                email: args.userInput.email,
                password: encryptedPassword
            })
            const result = await user.save()
            return { ...result, _id: result.id, password: null }
        } catch (error)  {
            throw error
        }
    }
}