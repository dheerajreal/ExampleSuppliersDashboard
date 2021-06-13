import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/Signup";

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
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
