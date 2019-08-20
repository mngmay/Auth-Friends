import React from "react";
import { Route, Link } from "react-router-dom";

import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Link to="/login">Login</Link> <Link to="/protected">Friends List</Link>
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/protected" component={FriendsList} />
    </div>
  );
}

export default App;
