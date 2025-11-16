const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.processPsyment =  async(req,res,next) => {
    const myPay = await stripe.paymentIntents.create({
        amount : req.body.amount,
        currency: 'inr',
        metadata: {
            company: 'Ecommerce'
        }
    })

    res.status(200).json({success: true, client_secret: myPay.client_secret})
}


exports.sendStripeKey =  async(req,res,next) => {

    try {
        res.status(200).json({stripeKey: process.env.STRIPE_KEY})
    } catch (error) {
        console.log(error)
    }
}