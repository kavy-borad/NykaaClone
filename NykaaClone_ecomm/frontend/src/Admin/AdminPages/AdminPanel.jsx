import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/Loading";
import axios from "axios";
import { getProductsFailure, getProductsRequest, getProductsSuccess } from '../../redux/Products/productAction';
import SmallNav from './SmallNav';

const AdminPanel = () => {
  const [filters, setFilters] = useState({ sort: "desc", category: "All", search: "" });
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const user = useSelector(store => store.login.login);
  const product = useSelector((store) => store.products.products);
  let token = localStorage.getItem("usersdatatoken");
  const dispatch = useDispatch();

  // Fetch products based on filters
  const getTodos = () => {
    dispatch(getProductsRequest());
    axios
      .get(`/products?search=${filters.search}&category=${filters.category}&sort=${filters.sort}`)
      .then((res) => {
        dispatch(getProductsSuccess(res.data));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(getProductsFailure());
        setLoading(false);
      });
  };

  // Delete product by ID
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/delete/product/${id}`, {
        headers: { authorization: token, role: user.role },
      });
      toast("Product deleted successfully");
      getTodos(); // Refetch products after deletion
    } catch (error) {
      console.log(error);
    }
  };

  // Update products when filters change
  useEffect(() => {
    getTodos();
  }, [filters]);

  // Handler for filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setLoading(true); // Set loading to true when filters change
  };

  return (
    <>
      <SmallNav />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin_pro_maind">
          <div className="sorted">
            {/* Category Filter */}
            <h3 style={{ color: "#fc2779", marginLeft: "10%", marginTop: "8%" }}>Filter By Category</h3>
            <Form>
              {["All", "Hair", "Lips", "Eyes", "Skin", "Nails", "Fragrances"].map((category) => (
                <Form.Check
                  key={category}
                  inline
                  label={`\u00A0\u00A0${category}`}
                  name="category"
                  value={category.toLowerCase()}
                  onChange={handleFilterChange}
                  type="radio"
                  id={`category-${category}`}
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    marginLeft: "10%",
                    marginTop: "4%",
                  }}
                  defaultChecked={category === "All"} // Default check "All"
                />
              ))}
            </Form>

            {/* Price Filter */}
            <h3 style={{ color: "#fc2779", marginLeft: "10%", marginTop: "12%" }}>Filter By Price</h3>
            <Form>
              {["asc", "desc"].map((sortOption) => (
                <Form.Check
                  key={sortOption}
                  inline
                  label={`\u00A0\u00A0${sortOption === "asc" ? "Low To High" : "High To Low"}`}
                  name="sort"
                  value={sortOption}
                  onChange={handleFilterChange}
                  type="radio"
                  id={`sort-${sortOption}`}
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    marginLeft: "10%",
                    marginTop: "4%",
                  }}
                  defaultChecked={sortOption === "desc"} // Default check "desc"
                />
              ))}
            </Form>
          </div>

          {/* Products Display */}
          <div className="bagg">
            {product.map((e, i) => (
              <div className="cartadmin" key={i}>
                <img src={e.images} alt="" />
                <div className="priadmin">
                  <h3>{e.name}</h3>
                  <h4>MRP: ₹{e.price}</h4>
                </div>
                <div className="btnss">
                  <Link to={`/product/${e._id}`}>
                    <i className="fa-solid fa-eye" style={{ color: "blue", fontSize: "21px" }}></i>
                  </Link>
                  <Link to={`edit/product/${e._id}`}>
                    <i className="fa-solid fa-edit" style={{ color: "green", fontSize: "21px" }}></i>
                  </Link>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteProduct(e._id)}
                    style={{ color: "red", fontSize: "21px" }}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default AdminPanel;
