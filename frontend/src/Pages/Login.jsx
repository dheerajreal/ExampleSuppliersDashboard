import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import SignupLogin from "../Layouts/SignupLogin";
import url from "../Utils/url";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.checkValidity());
    e.target.className = "was-validated";
    if (e.target.checkValidity()) {
      let formdata = {
        email: email,
        password: password,
      };
      //   console.log(formdata);
      axios
        .post(url + "/api/token/", { ...formdata })
        .then((resp) => resp.data)
        .then((data) => {
          //   console.log(data);
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          toast.success("Login Success");
          history.push("/");
        })

        .catch((err) => {
          // console.log(err.response.data.detail);
          toast.dark(`Failed login: ${err.response.data.detail}`);
        });
    }
  };

  return (
    <SignupLogin>
      <form onSubmit={handleSubmit} noValidate className="needs-validation">
        <h3 className="mb-4 mt-4">Login</h3>
        <div className="form-group mb-4 mt-4">
          <label className="text-uppercase">Email address</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter email"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          />
          <div className="invalid-feedback">Please enter an email</div>
        </div>
        <div className="form-group mb-4 mt-4">
          <label className="text-uppercase">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter password"
            pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            required
          />
          <div className="invalid-feedback">
            Please enter a password with minimum eight characters, containing
            one digit, one special character, one uppercase letter, one
            lowercase letter
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
        <br />
        <br />
        <p>
          Don't have an account <Link to="/signup">Signup</Link>
        </p>
      </form>
    </SignupLogin>
  );
};

export default Login;
