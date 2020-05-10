const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CartSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    items: [{
        icon: {
            type: Schema.Types.ObjectId,
            ref: 'Icon',
            alias: 'i'
        },
        quantity: {
            type: Number
        }
    }]
}, { timestamps: true })

const Cart = mongoose.model('Cart', CartSchema)
exports.Cart = Cart