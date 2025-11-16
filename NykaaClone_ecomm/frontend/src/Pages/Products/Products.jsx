import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loader } from "../../component/Loading";
import {
  getProductsRequest,
  getProductsFailure,
  getProductsSuccess,
} from "../../redux/Products/productAction";
import NavSecond from "../../component/header/NavSecond";
import "./products.css";
import { Form } from "react-bootstrap";
import { debounce } from 'lodash';

const Products = () => {
  const [filters, setFilters] = useState({ sort: "desc", category: "All", search: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((store) => store.products.products);

  // Function to fetch products with filters
  const getTodos = useCallback(async() => {
    dispatch(getProductsRequest());
    try {
      const response = await axios.get(
        `/products?search=${filters.search}&category=${filters.category}&sort=${filters.sort}`
      );
      dispatch(getProductsSuccess(response.data));
    } catch (error) {
      dispatch(getProductsFailure());
    } finally {
      setLoading(false);
    }
  }, [filters, dispatch]);

  // Debounced fetch function to avoid rapid API calls
  const debouncedGetTodos = useCallback(debounce(getTodos, 300), [getTodos]);

  // Use effect to fetch products on filter change
  useEffect(() => {
    debouncedGetTodos();
  }, [filters, debouncedGetTodos]);

  // Handler for category and sorting changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product navigation
  const shift = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <NavSecond />
      {loading ? (
        <Loader />
      ) : (
        <div className="pro_maind">
          <div className="p_sorted">
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
                  defaultChecked={category === "All"}
                />
              ))}
            </Form>
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
                  defaultChecked={sortOption === "desc"}
                />
              ))}
            </Form>
          </div>

          <div className="main_pro">
            {product.map((e, i) => (
              <div key={i} onClick={() => shift(e._id)}>
                <img src={e.images} alt="" />
                <h2>{e.name}</h2>
                <div>
                  {[...Array(4)].map((_, index) => (
                    <i
                      key={index}
                      className="fa-solid fa-star"
                      style={{ color: "#fc2779", fontSize: "12px" }}
                    ></i>
                  ))}
                </div>
                <p style={{ fontWeight: "600" }}>MRP: ₹{e.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
