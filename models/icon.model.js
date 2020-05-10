const mongoose = require('mongoose')

const IconSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    origin: {
        type: String,
        required: true,
        minlength: 1
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        percentage: {
            type: Number,
            required: true,
            $lte: 100
        },
        minQuantity: { 
            type: Number,
            required: true 
        },
        to: {
            type: Date
        },
        target: String
    }
})
IconSchema.path('name').index({ text : true });

const Icon = mongoose.model('Icon', IconSchema)
exports.Icon = Icon