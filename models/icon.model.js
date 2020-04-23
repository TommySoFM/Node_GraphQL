const mongoose = require('mongoose')

const IconSchema = new mongoose.Schema({
    icon_name: {
        type: String,
        required: true,
        // match: '\S+',
        unique: true
    },
    origin: {
        type: String,
        required: true,
        // match: '\S+'
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

const Icon = mongoose.model('IconModel', IconSchema)

exports.Icon = Icon