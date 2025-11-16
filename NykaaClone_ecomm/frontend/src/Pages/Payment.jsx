import React, { useEffect, useState } from 'react'
import './payment.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderFailure, getOrderRequest, getOrderSuccess } from '../redux/Order/OrderAction'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
import { addCartItems } from '../redux/Cart/CartAction'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavSecond from '../component/header/NavSecond'

const Payment = () => {

  const dispatch = useDispatch()
  const nav = useNavigate()

  const [pdata, setpdata] = useState({
    name: "",
    numbers: ""
  });

  const data = JSON.parse(sessionStorage.getItem('orderInfo'))
  console.log(data)
  let token = localStorage.getItem("usersdatatoken");
  console.log(token)

   const user = useSelector(store => store.login)
   const {order,isSuccess} = useSelector(store => store.order)
   console.log(order.user)
     
    const cart = useSelector((store) => store.cart.cartItems)
    const ship = useSelector((store) => store.cart.shippingInfo)

    const subtotal = cart.reduce((acc,e)=> acc+e.quantity*e.price,0)

    const shippingPrice = subtotal > 1000 ? 0 : 200
    const total = subtotal + shippingPrice


    const handleChange = (e) => {
      console.log(e.target)
      const { name, value } = e.target;
      setpdata({ ...pdata, [name]: value });
    };


  const handleSubmit = async(e) =>{
    e.preventDefault();

    const {name,numbers} = pdata;
    console.log(numbers, typeof(+numbers))

    if(name == ""){
      toast.error("Please enter your Card Name")
    }
    else if(numbers==""){
      toast.error("Please enter your Card Number")
    }
    else if(numbers.length !== 16){
      toast.error("Card Number should contain 16 digits only.")
    }
    else{
      const orderData = {
        userData:{
          "address":ship.address,
          "city":ship.city,
          "state":ship.state,
          "phoneNo":ship.phone,
        },
        orderItems : cart,
        itemsPrice: subtotal,
        shippingPrice: shippingPrice,
        totalPrice: total
      }
      // console.log(orderData)
      const dataa = await axios.post(
        'https://nykkabackend-cgkg.onrender.com/order',
        orderData,
        {
          headers:{
            authorization: token
          }
        }
      )
      console.log(dataa)
      dispatch(getOrderSuccess(dataa.data))
    }
}

function counter(){
  let i=0;
  let id= setInterval(function(){
    if(i==0){
      toast('Your Payment has been done')
    }
    else if(i==3){
      toast("Your order is confirmed")
      clearInterval(id)
    } 
    i++
  },1000)
}


  useEffect(() => {
    if(isSuccess === true){
      counter()
      localStorage.removeItem("cart");
      dispatch(addCartItems([]))
      sessionStorage.removeItem("orderInfo");
      nav('/')
    }
  }, [isSuccess])

  return (
    <>
    <NavSecond/>
       <div className="pay_div">
        <h1>Payment Details</h1>
        <input className="input" name="name" type="text" 
        placeholder="Enter Card holder Name"
         style={{fontSize: "17px", textAlign:"center"}}
         onChange={handleChange}
          />
        <br />
        <br/>
        <input className="input" name="numbers" type={"number"}
        placeholder="Enter Card Number"
        style={{fontSize: "17px", textAlign:"center"}} 
        onChange={handleChange}
         />
        <button className="buton" onClick={handleSubmit}>Pay ₹{data.total}</button>
      </div>
      <ToastContainer position="top-center"/>
    </>
  )
}

export default Payment
