import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import "./Login.css";
import { getLoginFailure, getLoginRequest, getLoginSuccess } from "../../redux/Login/loginAction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";
import NavSecond from "../../component/header/NavSecond";

const Login = () => {
  const nav = useNavigate();
  const [spin, setSpin] = useState(true);
  const [loading, setLoading] = useState(false); // Loader state for button
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((store) => store.login);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting automatically
    const { email, password } = data;

    // Validation for empty fields
    if (email === "") {
      toast.error("Please enter your Email");
      return; // Prevent submission if email is empty
    } 
    if (password === "") {
      toast.error("Please enter your password");
      return; // Prevent submission if password is empty
    }

    setLoading(true); // Start the button loader
    dispatch(getLoginRequest());

    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .post("/user/login", loginData, config)
      .then((res) => {
        console.log(res);
        dispatch(getLoginSuccess(res.data.result.userValid));
        if (res.data.status === 201) {
          localStorage.setItem("usersdatatoken", res.data.result.token);
          toast("User logged in successfully");
          setLoading(false); // Stop the button loader
          setData({ email: "", password: "" }); // Clear input fields
          nav("/");
        }
      })
      .catch((err) => {
        toast.error("This email address does not match with the password.");
        console.log(err);
        dispatch(getLoginFailure());
        setLoading(false); // Stop the button loader
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 1300);
  }, [isAuthenticated]);

  return (
    <>
      <NavSecond />
      {spin ? (
        <Loader />
      ) : (
        <>
          <div className="login_div">
            <h1>Welcome back</h1>
            <input
              className="input"
              name="email"
              type="text"
              placeholder="Enter Your Email"
              style={{ fontSize: "17px", textAlign: "center" }}
              value={data.email} // Bind the value to state
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              className="input"
              name="password"
              type="password" 
              placeholder="Enter Your Password"
              style={{ fontSize: "17px", textAlign: "center" }}
              value={data.password} 
              onChange={handleChange}
            />
            <br />
            <button className="buton" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Loading...' : "Login"}
            </button>
            <h5>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "black" }}>
                <span style={{ color: "black" }}>Sign-in</span>
              </Link>
            </h5>
            <ToastContainer position="top-center" />
          </div>
        </>
      )}
    </>
  );
};

export default Login;
