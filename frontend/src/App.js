import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Home from "./Pages/Home";
import Logout from "./Pages/Logout";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/logout" component={Logout} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/admin" component={Admin} exact />

          <Route component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
