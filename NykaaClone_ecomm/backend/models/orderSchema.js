const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userData: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phoneNo: { type: Number, required: true },
  },
  orderItems : [
      {
        name : {type: String, required:true},
        price : {type: Number, required:true},
        quantity : {type: Number, required:true},
        image : {type: String, required:true},
        product : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"products"
          },    
      }
  ],
  user:{
    type: mongoose.Schema.ObjectId,
    ref: "ecom_users",
    required: true,
  },
  itemsPrice: {type: Number, default: 0},
  shippingPrice: {type: Number, default: 0},
  totalPrice: {type: Number, default: 0},
});

const orders = new mongoose.model("order", orderSchema);
module.exports = orders;
