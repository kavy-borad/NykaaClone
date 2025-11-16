import React,{ useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserSuccess } from '../Redux/AdminAction';
import './AllUser.css'
import SmallNav from './SmallNav';
import { Loader } from '../../component/Loading';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AllUsers = () => {

    const dispatch = useDispatch();
    const [spin, setspin] = useState(true);
    const allUser = useSelector(store => store.admin.allUser)
    const user = useSelector(store => store.login.login)
    const token = localStorage.getItem('usersdatatoken')
    localStorage.setItem('userLen',JSON.stringify(allUser.length))

    const getTodos = async() => {
      return axios
      .get(`https://nykkabackend-cgkg.onrender.com/user/details`,{
                      headers: {
                          "Content-Type": "application/json",
                          "authorization": token,
                          }
                      })
      .then((res) => {
        console.log(res,"sdfghj")
        dispatch(getUserSuccess(res.data));
      })
      .catch((err) => {
      })
    };

    const deleteProduct = async(id) => {
      console.log(id)
      try {
        const delData = await axios.delete(`https://nykkabackend-cgkg.onrender.com/delete/user/${id}`, {
                    headers: {
                        authorization: token,
                       role: user.role
                    },
                  })
                  getTodos()
                  toast("User deleted Successfully")
                  // getTodos()
                  console.log(allUser)
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(() => {
      setTimeout(() => {
        setspin(false);
      }, 1300);
      getTodos()
    }, [])
   

  return (
    <>
    <SmallNav/>
    {
      spin ? (
        <Loader />
      ) : ( 
        <div className="users_main">
        {
            allUser.map((e,i)=>{
                return(
                    <>
                        <div>
                            <h2>First Name: &nbsp;&nbsp;<span>{e.fname}</span></h2>
                            <h2>Last Name: &nbsp;&nbsp;<span>{e.lname}</span></h2>
                            <h2>Email: &nbsp;&nbsp;<span>{e.email}</span></h2>
                            <h2>Role: &nbsp;&nbsp;<span>{e.role}</span></h2>
                            <button onClick={()=>{deleteProduct(e._id)}}>Delete</button>
                        </div>
                    </>
                )
            })
        }
      </div>
      ) }
       <ToastContainer position="top-center"/>
    </>
  )
}

export default AllUsers
