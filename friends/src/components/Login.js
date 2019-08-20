import React from "react";

const Login = () => {
  return (
    <form>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button>Submit</button>
    </form>
  );
};

export default Login;
