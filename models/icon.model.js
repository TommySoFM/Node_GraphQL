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
        value: {
            type: Number,
            required: true
        },
        unit: { 
            type: String,
            required: true 
        },
        target: String
    }
})

const Icon = mongoose.model('Icon', IconSchema)

exports.Icon = Icon