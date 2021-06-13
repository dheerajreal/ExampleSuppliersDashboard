import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
        .post("http://localhost:8000/api/token/", { ...formdata })
        .then((resp) => resp.data)
        .then((data) => {
          //   console.log(data);
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          history.push("/");
        })

        .catch((err) => {
          console.log(err.response.data.detail);
          alert(`Failed login: ${err.response.data.detail}`);
        });
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <form onSubmit={handleSubmit} noValidate className="needs-validation">
        <h3 className="mb-4 mt-4">Login</h3>
        <div className="form-group mb-4 mt-4">
          <label>Email address</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
          />
          <div className="invalid-feedback">Please enter an email</div>
        </div>
        <div className="form-group mb-4 mt-4">
          <label>Password</label>
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
        <br />
        <button type="submit" className="mb-4 mt-4 btn btn-primary btn-block">
          Submit
        </button>
        <br />
        <p>
          Don't have an account <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;