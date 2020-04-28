const mongoose = require('mongoose')

const Schema = mongoose.Schema
const  BillSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        icon: {
            type: Schema.Types.ObjectId,
            ref: 'Icon',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
}, { timestamps: true })

const BillModel = mongoose.model( 'Bill', BillSchema )
exports.Bill = BillModel