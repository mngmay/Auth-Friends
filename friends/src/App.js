import React from "react";
import { Route, Link } from "react-router-dom";

import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Link to="/login">Login</Link>
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
