import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { getUserData } from '../../redux/Login/loginAction'
import { useNavigate } from 'react-router-dom';
import "./order.css"
import NavSecond from '../../component/header/NavSecond';

const Order = () => {

  const nav = useNavigate()

    const dispatch = useDispatch() 
    const user = useSelector(store => store.login)
     
    const cart = useSelector((store) => store.cart.cartItems)
    const ship = useSelector((store) => store.cart.shippingInfo)

    console.log(ship,cart,user,"sdertyui")

    const subtotal = cart.reduce((acc,e)=> acc+e.quantity*e.price,0)
    console.log(subtotal)

    const shippingPrice = subtotal > 1000 ? 0 : 200
    const total = subtotal + shippingPrice

    const paymentt = () => {
      const data = {
        subtotal,
        shippingPrice,
        total
      }

      sessionStorage.setItem('orderInfo', JSON.stringify(data))
      nav('/payment')
    }


  return (
    <>
    <NavSecond/>
    <div className="s_add">
      <h1>Shipping Details</h1>
      <h2>Name : &nbsp;<span>{user.login.fname}</span></h2>
      <h2>Phone No : &nbsp;<span>{ship.phone}</span></h2>
      <h2>Email : &nbsp;<span>{user.login.email}</span></h2>
      <h2>Address : &nbsp;<span>{ship.address}</span></h2>
    </div>
    <div className="cart_p">
      <h1>Cart Details</h1>
    {cart.length > 0 ? (
            cart.map((e) => {
              return (
                <>
                  <div className="cart_order">
                    <img
                      src={e.image}
                      alt=""
                    />
                      <h3>{e.name}</h3>
                      <h4>MRP: ₹{e.price}</h4>
                      <h4>Quantity: {e.quantity}</h4>
                      <h4>{`Sub-total: ₹${e.price * e.quantity}`}</h4>
                  </div>
                </>
              );
            })
          ) : ""}
          <div className="cart_order">
            <h2>Subtotal : &nbsp;<span>₹{subtotal}</span></h2>
            <h2>Shipping Charges : &nbsp;<span>₹{shippingPrice}</span></h2>
            <h2>Total Price : &nbsp;<span>₹{total}</span></h2>
          </div>
          <button className='pbtnn'  onClick={() => {paymentt()}}> Proceed to Payment </button>
    </div>
    </>
  )
}

export default Order
