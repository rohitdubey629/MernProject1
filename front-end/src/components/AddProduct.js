import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const AddProductList = async () => {
    console.log(name, price, category, company);

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:4500/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("product add");
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
      {error && !name && (
        <span className="invalid-input"> Enter valid name</span>
      )}
      <input
        className="proInput"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter product price"
      />
      {error && !price && (
        <span className="invalid-input"> Enter valid price</span>
      )}
      <input
        className="proInput"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter product category"
      />
      {error && !category && (
        <span className="invalid-input"> Enter valid category</span>
      )}
      <input
        className="proInput"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter product company"
      />
      {error && !company && (
        <span className="invalid-input"> Enter valid company</span>
      )}
      <button className="proButton" onClick={AddProductList}>
        Submit
      </button>
    </div>
  );
};

export default AddProduct;
