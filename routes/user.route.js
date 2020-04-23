const config = require('config')
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/user.model')
const express = require('express')
const router = express.Router()

router.get('/current', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    await User.findOne({name: username}, (error, user) => {
        if (error) {
            res.status(401).json({ "message" : "Authentication failed.", "error" : error})
        }
        if (user == null) {
            res.status(401).json({ "message" : "Authentication failed." })
        } else {
            bcrypt.compare(password, user.password, (error, same) => {
                if (error) {
                    res.status(401).json({ "message" : "Authentication failed." })
                }
                if (same) {
                    const token = user.generateAuthToken()
                    res.header("x-auth-token", token).status(200).json({ "message" : "Login success!" })
                }
            })
        }
    })
})

router.get('/logout', auth, async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    const expiredToken = jwt.sign({ 
        _id: token._id,
        isAdmin: token.isAdmin
    }, config.get('myprivatekey'), { expiresIn: 0})
})

router.post('/signup', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {return res.status(400).send(error.details[0].message)}

    let user = await User.findOne({ email: req.body.email });
    if(user) {return res.status(400).send('User already registered.')}

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    });
    user.password = await bcrypt.hash(user.password, 10)
    try {
        await user.save()
        res.header("x-auth-token", token).json({
            "message": "Sign-up success!"
        })
    }
    catch (error) {
        res.status(501).json({ "message": "Registration Error" })
    }
})

module.exports = router;