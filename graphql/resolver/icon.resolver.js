const { Icon } = require('../../models/icon.model')
const { AuthFilter, AdminFilter } = require('./methods')

module.exports = {
    icons: async () => {
        try{
            const icons = await Icon.find()
            return icons.map( icon => {
                return {
                    ...icon._doc,
                    _id: icon.id
                }
            })
        } catch (error) {
            throw error
        }

    },
    icon: async args => {
        try{
            const icon = await Icon.findOne({ name: args.name })
            if(!icon){
                throw new Error('Icon not found!')
            }
            return {
                ...icon._doc,
                _id: icon.id
            }
        } catch (error){
            throw error
        }
    },
    createIcon: async (args, req) => {
        AuthFilter(req)
        AdminFilter(req)
        try {
            const iconSearch = await Icon.findOne({ name: args.iconInput.name })
            if (iconSearch) {
                throw new Error ('Icon exists')
            }
    
            const icon = new Icon({
                name: args.iconInput.name,
                origin: args.iconInput.origin,
                price: +args.iconInput.price,
                picture: args.iconInput.picture,
                discount: {
                    value: +args.iconInput.discount_value,
                    unit: args.iconInput.discount_unit,
                    target: args.iconInput.discount_target
                }
            })
            const result = await icon.save()
            return icon
        } catch (error) {
            throw error
        }
    }
}