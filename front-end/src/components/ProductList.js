import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch("http://localhost:4500/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:4500/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    if (result) {
      alert("record is deleted");
      getProduct();
    }
  };

  const searchHandel = async (event) => {
    const key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4500/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProduct();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        onChange={searchHandel}
        placeholder="Search"
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company Name</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <button>
                <Link className="btn" to={"/update/" + item._id}>
                  Update
                </Link>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
