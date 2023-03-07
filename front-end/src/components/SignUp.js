import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    let result = await fetch("http://localhost:4500/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate("/");
    // console.log(name, email, password);
  };

  return (
    <div className="register">
      <input
        className="reginput"
        type="text"
        name=""
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="user name"
      />
      <input
        className="reginput"
        type="email"
        name=""
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="user email"
      />
      <input
        className="reginput"
        type="password"
        name=""
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="user password"
      />
      <button onClick={collectData} className="regbutton">
        Submit
      </button>
    </div>
  );
};

export default SignUp;
