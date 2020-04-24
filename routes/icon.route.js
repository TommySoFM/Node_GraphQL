const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const { Icon } = require('../models/icon.model')

router.get('/all', async (req, res) => {
    const icons = await Icon.find()
    if ( icons.length > 0 ) {
        res.status(200).send(icons)
    } else {
        res.status(404).send('Nothing found.')
    }
})

router.get('/:name', async (req, res) => {
    const query = req.params.name
    try {
        const icon = Icon.findOne({name: query})
        res.status(200).send(icon)
    }
    catch (error) {
        { res.status(404).json({ "message": "Target not found", "error": error })}
    }
})

router.post('/', auth, isAdmin, async (req, res) => {
    const icon = new Icon({
        name: req.body.name,
        origin: req.body.origin,
        price: req.body.price,
        picture: req.body.picture,
        discount: req.body.discount
    })
    try{
        await icon.save()
        res.status(200).json({ "message": "Item saved!" })
    } catch (error) {
        res.status(500).json({ "message": "Error in saving item", "error": error })
    }
})

module.exports = router;