import React from "react";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Drawer from '@mui/material/Drawer';
import axios from "axios";
import { getProductsFailure, getProductsRequest, getProductsSuccess } from "../../redux/Products/productAction";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from "react";
import { getLogoutUser, getUserData } from "../../redux/Login/loginAction";
import ResponsiveNav from "./ResponsiveNav";


const Navbar = ({user,isAuthenticated}) => {


  const nav = useNavigate()

  const [search, setsearch] = useState("")
  const [sort, setsort] = useState("desc")
  const [category, setcategory] = useState("All")
  const [open, setopen] = useState(false)
  const [loginopen, setloginopen] = useState(false)
  const [drawer, setdrawer] = useState(false)

  const product = useSelector((store) => store.products.products);
  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch(getProductsRequest());

    return axios
      .get(`/products?search=${search}&category=${category}&sort=${sort}`)
      .then((res) => {
        // console.log(res.data)
        dispatch(getProductsSuccess(res.data));
        setopen(true)
      })
      .catch((err) => {
        dispatch(getProductsFailure());
      });
  };

  // drawer 
  const handleDrawer=()=>{
    setdrawer(false)
  }


  // log out
  const logoutuser = async() => {
    setloginopen(false)
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token)

    const res = await fetch("/user/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        },
        credentials: 'include'
    });

    const data = await res.json();

    if (data.status == 201) {
      dispatch(getLogoutUser())
      isAuthenticated=false
      // nav("/")
        toast('User logged out Successfully')
        localStorage.removeItem("usersdatatoken");
    } else {
    }
}

  const admin = () => {
    setloginopen(false)
    if(user.login.role === "admin"){
      nav('/admin')
    }
    else{
      toast.error('Sorry you are not an Admin!')
    }
  }

  const searchbox = () => {
    setopen(false)
    setsearch("")
  }

  const accountt = () =>{
    setloginopen(false)
    nav('/account')
  }

  console.log(drawer)
  
  useEffect(() => {
    getTodos();
  }, [search]);

  return (
    <>
    <header>
      <nav>
        <div className="left">


           <IconButton className="hamburgur" onClick={()=>{setdrawer(true)}}>
            <MenuIcon style={{color:"#fc2779", fontSize: "30px" }} />
          </IconButton>

          <Drawer open={drawer} onClose={handleDrawer}>
            <ResponsiveNav user={user} isAuthenticated={isAuthenticated} drawerr={handleDrawer}/>
          </Drawer>

          <div className="navlogo">
            <Link to='/'>
            <img
              src="data:image/png;base64,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"
              alt=""
            /></Link>
          </div>
          <div className="nav_searchbaar">
            <input
              placeholder="Search on Nykka"
              type="text"
              onChange={(e)=>setsearch(e.target.value)}
              style={{ fontSize: "17px", textAlign: "center", 
              backgroundColor:"rgb(246, 236, 236)" }}
              value={search}
            />
            <div className="search_icon">
              <i
                class="fa-solid fa-magnifying-glass"
                style={{ color: "white" }}
              ></i>
            </div>
            {/* search */}
            {
              search && open && <div className="searchbox" >
                {
                  product.map((e,i)=>{
                    return(
                      <>
                      <Link to={`/product/${e._id}` }>
                      <div className="list_div" onClick={searchbox}>
                        <img style={{height:"50px", width:"80px"}} src={e.images} alt=''/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {e.name}
                        </div>
                      </Link>
                      </>
                    )
                  })
                }
            </div>
            }
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            {
              user.isAuthenticated ? <>
                <a onClick={()=>{setloginopen(!loginopen)}}>{user.login.fname}&nbsp;&nbsp;<i class="fa-solid fa-angle-down"></i></a>
                {
                  loginopen ? <>
                    <div className="loginbox">
                      <div className="account" onClick={()=>{accountt()}} >
                        <h1>My Account</h1>
                      </div>
                      <div className="logout" onClick={()=>{logoutuser()}} >
                        <h1>Logout</h1>
                      </div>
                      <div className="adminn" onClick={()=>admin()} >
                        <h1>Admin Panel</h1>
                      </div>
                    </div>
                  </> : ""
                }
              </>
                 : 
              <Link to='/signup'><a>&nbsp;&nbsp;&nbsp;Signin</a></Link>
            }
          </div>
          <div className="cart_btn" >
          <Link to='/cart'>
            {/* Cart */}
             <i class="fa-solid fa-bag-shopping" style={{ fontSize: "33px", color: "#fc2779"}} ></i>
          </Link>
          </div>   
        </div>
      </nav>
      <ToastContainer position="top-center"/>
    </header>
    </>
  );
};

export default Navbar;
