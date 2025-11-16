import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSignupFailure, getSignupRequest, getSignupSuccess } from "../../redux/SignUp/signaction";
import NavSecond from "../../component/header/NavSecond";

const Signup = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [spin, setSpin] = useState(true);
  const [loading, setLoading] = useState(false); // Loader state for button
  const { isAuthenticated } = useSelector((store) => store.signUp);

  const [image, setImage] = useState("");
  const [sdata, setsData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsData({ ...sdata, [name]: value });
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const { fname, lname, email, password } = sdata;

    // Validation for empty fields
    if (fname === "") {
      toast.error("Please enter your First Name");
      return; // Prevent submission if First Name is empty
    } else if (lname === "") {
      toast.error("Please enter Last Name");
      return; // Prevent submission if Last Name is empty
    } else if (email === "") {
      toast.error("Please enter your Email");
      return; // Prevent submission if Email is empty
    } else if (password === "") {
      toast.error("Please enter your password");
      return; // Prevent submission if Password is empty
    }

    setLoading(true); // Start the button loader

    const data = new FormData();
    data.append("fname", fname);
    data.append("lname", lname);
    data.append("email", email);
    data.append("password", password);
    data.append("user_profile", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    dispatch(getSignupRequest());

    axios
      .post("https://nykkabackend-cgkg.onrender.com/user/register", data, config)
      .then((res) => {
        console.log(res);
        dispatch(getSignupSuccess(res.data.finalUser));
        toast("Sign up Successfully.");
        setLoading(false); // Stop the button loader
        setsData({ fname: "", lname: "", email: "", password: "" }); // Clear input fields
        setImage(""); // Clear the image input
        nav("/login");
      })
      .catch((error) => {
        toast.error("This email address already exists.");
        dispatch(getSignupFailure());
        setLoading(false); // Stop the button loader
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 1300);
  }, []);

  return (
    <>
      <NavSecond />
      {spin ? (
        <Loader />
      ) : (
        <>
          <div className="login_div">
            <h1>SignUp</h1>
            <input
              className="input"
              name="fname"
              type="text"
              placeholder="Enter Your First Name"
              style={{ fontSize: "17px", textAlign: "center" }}
              value={sdata.fname}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              className="input"
              name="lname"
              type="text"
              placeholder="Enter Your Last Name"
              style={{ fontSize: "17px", textAlign: "center" }}
              value={sdata.lname}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              className="input"
              name="email"
              type="text"
              placeholder="Enter Your Email"
              style={{ fontSize: "17px", textAlign: "center" }}
              value={sdata.email}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              className="input"
              name="password"
              type="password" // Changed type to password for security
              placeholder="Enter Your Password"
              style={{ fontSize: "17px", textAlign: "center" }}
              value={sdata.password}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              name="user_profile"
              onChange={setProfile}
              type="file"
              placeholder="Choose Profile picture"
              className="input"
              style={{ fontSize: "17px", textAlign: "center", backgroundColor: "white" }}
            />
            <br />
            <button className="buton" type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Loading...' : 'Signup'}
            </button>
            <h5>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "black" }}>
                <span style={{ color: "black" }}>Login</span>
              </Link>
            </h5>
            <ToastContainer position="top-center" />
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
