const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    isAdmin: Boolean
})

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ 
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get('myprivatekey'), { expiresIn: '5h' /*, algorithm: 'HS512'*/ })
    return token;
}

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email( { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;