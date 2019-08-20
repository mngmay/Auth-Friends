import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && (
        <div className="loading-msg">
          <ClipLoader loading={props.loading} />
        </div>
      )}
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
