import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART, SHIPPING_INFO } from "./CartActonType";



export const addCartItems = (id,quantity) => async(dispatch,getState) => {

    const {data} = await axios.get(`https://nykkabackend-cgkg.onrender.com/product/${id}`)
    console.log(data)
    dispatch({
        type: ADD_TO_CART,
        payload:{
            _id: data._id, 
            name: data.name,
            price: data.price,
            image: data.images,
            stock: data.stock,
            quantity
        }
    })
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
}

export const removeCartItems = (id) => async(dispatch,getState) => {
    // console.log(id)
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
}

export const shippingInfo = (data) => async(dispatch,getState) => {
    // console.log(id)
    dispatch({
        type: SHIPPING_INFO,
        payload: data
    })
    localStorage.setItem("shipping", JSON.stringify(data))
}