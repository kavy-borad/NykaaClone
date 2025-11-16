const order = require("../models/orderSchema")
const product = require('../models/productSchema')

// createOrder 
exports.postOrder = async(req,res) => {
    const {userData, orderItems,paymentInfo,itemsPrice,shippingPrice, totalPrice} = req.body 
    try {
        // console.log(req.user._id)
        const orderData  = new order({
            userData,orderItems,paymentInfo,
            itemsPrice,shippingPrice,totalPrice,
            paidAt: Date.now(),
            user: req.userId
        })
        await orderData.save()
        res.status(200).json(orderData)

    } catch (error) {
        res.status(401).json(error)
        console.log(error)
    }
}

// singleOrder 
exports.myOrder = async(req,res,next) =>{
    const orderdata = await order.find({user: req.userId})

    try {
        if(!orderdata){
            res.status(401).json("order doesn't present")
        }
        else{
            res.status(200).json(orderdata)
        }
        
    } catch (error) {
        console.log(error)
    }

}
