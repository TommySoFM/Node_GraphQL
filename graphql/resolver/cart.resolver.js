const { Cart } = require('../../models/cart.model')

module.exports = {
    cart: async (args, req) => {
        try {
            const cart = await Cart.findOne({ user: req.user._id }).populate('user').populate('items.icon')
            if(!cart){
                throw new Error ('No cart exists.')
            }
            return cart
        } catch (error) {
            throw error
        }
    },
    addToCart: async ({ itemID, quantity }, req) => {
        try {
            const cart = await Cart.findOne({ user: req.user._id })
            if(!cart){
                const newCart = new Cart({
                    user: req.user._id,
                    items: [{
                        icon: itemID,
                        quantity: quantity
                    }]
                })
                await newCart.save()
                return newCart
            }

            const isItemExist = await Cart.findOne({ user: req.user._id, items: {$elemMatch: { icon: itemID }}})
            if(isItemExist) {
                // await cart.updateOne({ $set: { 'items.$[i].quantity': quantity }}, { arrayFilters: [{ 'i.icon': itemID }]})
                const newCart = 
                    Cart.findOneAndUpdate(
                        { user: req.user._id },
                        { $set: { 'items.$[i].quantity': quantity }},
                        { arrayFilters: [{ 'i.icon': itemID }], new: true }
                    )
                return newCart
            } else {
                console.log('Add new item to list')
                cart.items.push({
                    icon: itemID,
                    quantity: quantity        
                })
                await cart.save()
                return cart
            }
        } catch (error) {
            throw error
        }
    },
    emptyCart: async (args, req) => {
        try {
            await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
            return 'Cart emptied.'
        } catch (error) {
            throw error
        }
    }
}