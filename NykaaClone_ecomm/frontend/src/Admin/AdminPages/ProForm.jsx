import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../component/Loading";
import axios from "axios";
import { addProductFailure, addProductRequest, addProductSuccess } from "../Redux/AdminAction";
import SmallNav from "./SmallNav";
import "./Proform.css";
import "react-toastify/dist/ReactToastify.css";

const ProForm = () => {
  const user = useSelector((store) => store.login.login);
  const dispatch = useDispatch();
  
  const [spin, setSpin] = useState(true); // For initial loading spinner
  const [submitting, setSubmitting] = useState(false); // For form submission spinner
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    images: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  let token = localStorage.getItem("usersdatatoken");

  const shippingSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, rating, images, category, stock } = data;

    if (
      name === "" || description === "" || price === "" || rating === "" || images === "" || category === "" || stock === ""
    ) {
      toast.error("Please fill all the details");
    } else {
      try {
        setSubmitting(true);  // Start form submission spinner
        dispatch(addProductRequest());
        const prodataa = await axios.post(
          "/add/product",
          { name, description, price, rating, images, category, stock },
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          }
        );
        
        if (prodataa.status === 200) {
          dispatch(addProductSuccess(prodataa.data));
          toast.success("Product added successfully.");
          // Reset form fields
          setData({
            name: "",
            description: "",
            price: "",
            rating: "",
            images: "",
            category: "",
            stock: "",
          });
        }
      } catch (error) {
        dispatch(addProductFailure());
        toast.error("Failed to add product.");
        console.log(error);
      } finally {
        setSubmitting(false); // Stop the form submission spinner
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSpin(false); // Stop the initial loading spinner
    }, 1300);
  }, []);

  return (
    <>
      <SmallNav />
      {spin ? (
        <Loader />
      ) : (
        <div className="add_div">
          <h1>Add new product</h1>
          <input
            className="input"
            name="name"
            placeholder="Enter product name"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.name}
          />
          <br /><br />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Enter product description"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.description}
          />
          <br /><br />
          <input
            className="input"
            type="number"
            name="price"
            placeholder="Enter product price"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.price}
          />
          <br /><br />
          <input
            className="input"
            type="url"
            name="images"
            placeholder="Enter product image Url"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.images}
          />
          <br /><br />
          <input
            className="input"
            type="text"
            name="category"
            placeholder="Enter product category"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.category}
          />
          <br /><br />
          <input
            className="input"
            type="number"
            name="rating"
            placeholder="Enter product rating"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.rating}
          />
          <br /><br />
          <input
            className="input"
            type="text"
            name="stock"
            placeholder="Enter product stock"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.stock}
          />
          <br />
          <button className="buton" onClick={shippingSubmit} type="submit">
            {submitting ? 'Adding...' : "Add"}
          </button>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default ProForm;
