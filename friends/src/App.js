import React from "react";
import { Route, NavLink } from "react-router-dom";

import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <div className="nav-links">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
        <NavLink to="/protected" className="nav-link">
          Friends List
        </NavLink>
      </div>
      <div className="components">
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/protected" component={FriendsList} />
      </div>
    </div>
  );
}

export default App;
