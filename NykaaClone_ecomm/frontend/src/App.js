
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./component/header/Navbar";
import NavSecond from "./component/header/NavSecond";
import "./App.css"
import Products from "./Pages/Products/Products";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import Home from './component/Home/Home';
import Login from './Pages/Register/Login';
import Signup from './Pages/Register/Signup';
import Cart from './Pages/Cart/Cart';    
import Shipping from './Pages/Shipping/Shipping';
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from './redux/Login/loginAction';
import { useEffect, useState } from 'react';
import Order from './Pages/Shipping/Order';
import Payment from './Pages/Payment';
import store from './store'
import ProForm from "./Admin/AdminPages/ProForm";
import AdminPanel from "./Admin/AdminPages/AdminPanel";
import AdminEdit from "./Admin/AdminPages/AdminEdit";
import AllUsers from "./Admin/AdminPages/AllUsers";
import { getUserSuccess } from "./Admin/Redux/AdminAction";
import MainPage from "./Admin/AdminPages/MainPage";
import Account from "./Pages/Account/Account";
import Error from "./Pages/Error/Error";
import Footer from "./component/Footer/Footer";


function App() {

  const dispatch = useDispatch()
  let token = localStorage.getItem("usersdatatoken");
  const {login,isAuthenticated} = useSelector(store => store.login)

  // console.log(login.role)



  useEffect(() => {
    dispatch(getUserData(token))
  }, [])

  return (
    <>
    <Navbar user={{login,isAuthenticated}} />
      <Routes>
      {
        isAuthenticated == true ?( <>
        <Route path="/shipping" element={<Shipping /> } /> 
        <Route path='/payment' element={<Payment/>} />
        <Route path="/order" element={<Order /> } />
        <Route path='/account' element={<Account/>}/>
        <Route path='/adminform' element={<ProForm/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path="/landing" element={<MainPage/>}/>
        <Route path='/users' element={<AllUsers/>}/>
        <Route path="/admin/edit/product/:id" element={<AdminEdit /> } />
        </>) : (<Route path='/login' element={<Login/>}/>)
      }  
        <Route path="/" element={<Home /> } />
        <Route path="*" element={<Error /> } />
        <Route path="/pro" element={<Products /> } />
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/product/:id" element={<SingleProduct /> } />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
