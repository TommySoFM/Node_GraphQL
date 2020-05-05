const { Bill } = require('../../models/bill.model')
const { Cart } = require('../../models/cart.model')
const { AuthFilter } = require('./methods')
const asyncRedis = require('async-redis')
const client = asyncRedis.createClient()
//{ host: 'redis-server', port: 6379}

module.exports = {
    addToBill: async (args, req) => {
        AuthFilter(req)
        try {
            const cart = await Cart.findOneAndDelete({ owner: req.user._id})
            const bill = new Bill({
                user: cart.owner,
                items: [...cart.items]
            })
            await bill.save()
            const submittedBill = await Bill.findOne({ user: req.user._id }).populate('user').populate('items.icon')
    
            cart.items.forEach( item => {
                client.zrank( "icon", item.icon.id, (error, result) => {
                    if (error) throw error
                    if (result == null) {
                        throw new Error('Icon is not found in Redis')
                    } else  {
                        client.zincrby( "icon", item.quantity, item.icon._id.toString(), (error, result) => {
                            if (error) throw error
                            console.log('ZINCRBY Result: ' + result)
                        })
                    }
                })
            })
            return submittedBill
        } catch (error) {
            throw error
        }
    }
}