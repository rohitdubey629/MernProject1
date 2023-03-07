import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:4500/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  const updateProduct = async () => {
    let result = await fetch(`http://localhost:4500/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Product updated");
      navigate("/");
    }
  };

  return (
    <div className="product">
      <input
        className="proInput"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />

      <input
        className="proInput"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter product price"
      />

      <input
        className="proInput"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter product category"
      />

      <input
        className="proInput"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter product company"
      />

      <button className="proButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
