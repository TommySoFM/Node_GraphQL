const { Bill } = require('../../models/bill.model')
const { Cart } = require('../../models/cart.model')
const { AuthFilter } = require('./methods')

module.exports = {
    addToBill: async (args, req) => {
        AuthFilter(req)

        const cart = await Cart.findOneAndDelete({ owner: req.user._id})
        const bill = new Bill({
            user: cart.owner,
            items: [...cart.items]
        })
        await bill.save()
        const submittedBill = await Bill.findOne({ user: req.user._id }).populate('user').populate('items.icon')
        return submittedBill
    }
}