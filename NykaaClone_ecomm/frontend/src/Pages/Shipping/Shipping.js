import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { shippingInfo } from '../../redux/Cart/CartAction'
import '../Register/Login.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";
import NavSecond from '../../component/header/NavSecond'

const Shipping = () => {

  const nav = useNavigate()
    const dispatch = useDispatch() 
    const [spin, setspin] = useState(true);
  const {shipping} = useSelector((store) => store.cart.shippingInfo)
  const [city, setcity] = useState("")
  const [state, setstate] = useState("")
  const [address, setaddress] = useState("")
  const [phone, setphone] = useState("")


const shippingSubmit = (e) => {
  e.preventDefault() 
  if(city==""){
    toast.error("Please enter your City")
  }
  else if(state==""){
    toast.error("Please enter your State")
  }
  else if(address==""){
    toast.error("Please enter your Address")
  }
  else if(phone==""){
    toast.error("Please enter your Phone No.")
  }
  else if(phone.length !== 10){
    toast.error("Phone No. should be 10 digits")
  }
  else{
    dispatch(shippingInfo({city,state,address,phone}))
    nav('/order')
  }
}

useEffect(() => {
  setTimeout(() => {
    setspin(false);
  }, 1300);
}, []);

  return (
    <>
    <NavSecond/>
      {spin ? (
        <Loader />
      ) : (
        <>
        <div className="login_div">
        <h1>Address</h1>
        {/* <h4>Enter your City</h4> */}
        <input className="input" value={city} placeholder="Enter your City" style={{fontSize: "17px", textAlign:"center"}} onChange={(e)=>setcity(e.target.value)} />
        <br /><br />
        {/* <h4>Enter your State</h4> */}
        <input className="input" type='text' placeholder="Enter your State" style={{fontSize: "17px", textAlign:"center"}} value={state}  onChange={(e)=>setstate(e.target.value)} />
        <br /><br />
        {/* <h4>Enter your Address</h4> */}
        <input className="input"  type='text' placeholder="Enter your Address" style={{fontSize: "17px", textAlign:"center"}} value={address} onChange={(e)=>setaddress(e.target.value)} />
        <br /><br />
        {/* <h4>Enter your Phone No.</h4> */}
        <input  className="input"  value={phone} placeholder="Enter your Phone No." style={{fontSize: "17px", textAlign:"center"}}  onChange={(e)=>setphone(e.target.value)}/>
        <br />
        <button className="buton" onClick={shippingSubmit} type='submit' >Proceed</button>
        <ToastContainer position="top-center"/>
      </div>
      </>
      )}
    </>
  )
}

export default Shipping
