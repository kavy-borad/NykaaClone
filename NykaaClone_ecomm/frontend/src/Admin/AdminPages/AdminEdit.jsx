import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../Pages/Register/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/Loading";
import axios from "axios";
import SmallNav from "./SmallNav";
import { singleProductSuccess } from "../../redux/SingleProduct/singleProductAction";
import { editProductSuccess } from "../Redux/AdminAction";

const AdminEdit = () => {
  const { id } = useParams();
  const user = useSelector((store) => store.login.login);
  const nav = useNavigate();
  let token = localStorage.getItem("usersdatatoken");
  const dispatch = useDispatch();
  const [spin, setSpin] = useState(true); // For initial loading
  const [submitting, setSubmitting] = useState(false); // For form submission
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    images: "",
    category: "",
    stock: "",
  });

  // Fetch product details
  const getProduct = () => {
    return axios
      .get(`/product/${id}`)
      .then((res) => {
        dispatch(singleProductSuccess(res.data));
        setData(res.data);
      })
      .catch((err) => {
        toast.error("Failed to load product details");
      });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Submit edited product
  const shippingSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, rating, images, category, stock } = data;

    // Validation: Ensure all fields are filled
    if (name === "" || description === "" || price === "" || rating === "" || images === "" || category === "" || stock === "") {
      toast.error("Please fill all the details");
    } else {
      try {
        setSubmitting(true); // Show spinner during submission
        const prodataa = await axios.put(
          `/update/product/${id}`,
          { name, description, price, rating, images, category, stock },
          {
            headers: {
              authorization: token,
              role: user.role,
            },
          }
        );
        
        if (prodataa.status === 200) {
          dispatch(editProductSuccess(prodataa.data));
          toast.success("Product updated successfully.");
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
          nav("/admin"); // Navigate back to admin page
        }
      } catch (error) {
        toast.error("Failed to update product.");
      } finally {
        setSubmitting(false); // Stop spinner
      }
    }
  };

  // Fetch product details when component mounts
  useEffect(() => {
    getProduct();
    setTimeout(() => {
      setSpin(false); // Stop initial loading spinner
    }, 1300);
  }, []);

  return (
    <>
      <SmallNav />
      {spin ? (
        <Loader />
      ) : (
        <div className="add_div">
          <h1>Edit product</h1>
          <input
            className="input"
            name="name"
            placeholder="Enter product name"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.name}
          />
          <br />
          <br />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Enter product description"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.description}
          />
          <br />
          <br />
          <input
            className="input"
            type="number"
            name="price"
            placeholder="Enter product price"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.price}
          />
          <br />
          <br />
          <input
            className="input"
            type="url"
            name="images"
            placeholder="Enter product image Url"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.images}
          />
          <br />
          <br />
          <input
            className="input"
            type="text"
            name="category"
            placeholder="Enter product category"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.category}
          />
          <br />
          <br />
          <input
            className="input"
            type="number"
            name="rating"
            placeholder="Enter product rating"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.rating}
          />
          <br />
          <br />
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
            {submitting ? "Updating..." : "Edit"}
          </button>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default AdminEdit;
