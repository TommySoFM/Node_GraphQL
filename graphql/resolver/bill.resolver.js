const { Bill } = require('../../models/bill.model')
const { Cart } = require('../../models/cart.model')
const { User } = require('../../models/user.model')
const { Icon } = require('../../models/icon.model')
const { AuthFilter } = require('./methods')
const redis = require('redis')
const client = redis.createClient()
//{ host: 'redis-server', port: 6379}

const mongoose = require('mongoose')

const toISOTime = function (year, month, day) {
    const currentDate = new Date(year, month-1, day)
    return currentDate.toISOString()
}

module.exports = {
    getBills: async (args, req) => {
        AuthFilter(req)
        try{
            const bills = await Bill.find({ user: req.user._id }).populate(['user', 'items.icon'])
            console.log(bills)
            if(bills.length == 0){
                throw new Error ('Empty bills')
            }
            return bills
        } catch (error){
            throw error
        }
    },
    searchBill: async (args, req) => {
        AuthFilter(req)

        let periodSearch = false
        if (args.to.length === 3 && args.from.length === 3){
            periodSearch = true
        }
        try {
            let bills = await Bill.aggregate([
                { $match: { 
                    user: mongoose.Types.ObjectId(req.user._id),
                    $expr: {
                        $cond: {
                            if: { $eq: [ periodSearch, true] },
                            then: { 
                                $and: [
                                    { $lte: [ "$createdAt", toISOTime( ...args.to )]}, 
                                    { $gte: [ "$createdAt", toISOTime( ...args.from )]} 
                                ]},
                            else: { $gte: [ "$createdAt", toISOTime(2010, 1 ,1)]}
                        }
                    }}
                },
                { $lookup: {
                    from: "icons",
                    localField: "items.icon",
                    foreignField: "_id",
                    as: "icons_expanded"
                }},
                { $match: {
                    "icons_expanded.name": new RegExp(args.keyword)
                }},
                { $project: {
                    icons_expanded: 0
                }}
            ])
            bills =  await User.populate(bills, { path: 'user' })
            bills =  await Icon.populate(bills, { path: 'items.icon' })
            return bills
        } catch (error) {
            throw error
        }
    },
    addToBill: async (args, req) => {
        AuthFilter(req)
        try {
            const currentDate = new Date
            const currentLocaleDate = currentDate.toISOString()
            await Cart.aggregate([
                { $match: { user: mongoose.Types.ObjectId(req.user._id) }},
                { $limit: 1 },
                { $project: {"user": 1, "items": 1, "createdAt": currentLocaleDate}},
                { $merge: {
                    into: "bills",
                    on: "_id",
                    whenMatched: "replace",
                    whenNotMatched: "insert"
                }}
            ])
            const cart = await Cart.findOneAndDelete({ user: req.user._id })
            console.log(cart)
            cart.items.forEach( item => {
                console.log(item.icon._id.toString())
                client.zrank( "icon", item.icon._id.toString(), (error, result) => {
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
            return 'Success'
        } catch (error) {
            throw error
        }
    }
}