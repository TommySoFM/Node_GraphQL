const { Icon } = require('../../models/icon.model')
const { AuthFilter, AdminFilter } = require('./methods')
const redis = require('redis')
const client = redis.createClient()
//{ host: 'redis-server', port: 6379}

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
    searchIcon: async args => {
        if( args.keyword.length < 3 ){
            return []
        } else {
            try{
                let icons = []
                switch (args.method) {
                    case 'partial':
                        icons = await Icon.find({ name: new RegExp(args.keyword, "gi")}, null, { limit: args.number })
                        break
                    case 'full':
                        icons = await Icon.find({ $text: { $search: args.keyword, $caseSensitive: false }})
                        break
                }
                return icons
            } catch (error) {
                throw error
            }
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
                    percentage: +args.iconInput.discount_percentage,
                    minQuantity: args.iconInput.discount_minQuantity,
                    to: args.iconInput.discount_to,
                    target: args.iconInput.discount_target
                }
            })
            const result = await icon.save()
            client.zadd( ["icon", 0, result.id ], (error, response) => {
                if (error) throw error
                console.log('Response: Saved ' + response + ' item')
            })
            return result
        } catch (error) {
            throw error
        }
    },
    changeDiscount: async (args, req) => {
        AuthFilter(req)
        AdminFilter(req)
        try {
            const icon = await Icon.findByIdAndUpdate ( 
                args.iconID,
                { $set: {
                    discount: {
                        percentage: +args.discount.percentage,
                        minQuantity: +args.discount.minQuantity,
                        to: args.discount.to,
                        target: args.discount.target
                    }
                }}, { new: true })
            return icon
        } catch (error) {
            throw error
        }
    }
}