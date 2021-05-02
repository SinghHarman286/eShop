import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import LogInForm from "./LogInForm";
import Post from "./Post";
import SignUpForm from "./SignUpForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setisAuthenticated] = useState(localStorage.getItem("token") ? true : false);

  const handleAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setisAuthenticated(true);
    } else {
      setToken(null);
      setisAuthenticated(false);
    }
  };
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route exact path="/posts" render={(props) => <Post {...props} isAuthenticated={isAuthenticated} token={token} />} />
        <Route exact path="/signup" render={(props) => <SignUpForm {...props} />} />
        <Route exact path="/login" render={() => <LogInForm handleAuth={handleAuth} />} />
        <Route
          exact
          path="/logout"
          render={() => {
            localStorage.clear();
          }}
        />
        <Redirect to="/signup" />
      </Switch>
    </div>
  );
}

export default App;
