import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import url from "../Utils/url";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.checkValidity());
    e.target.className = "was-validated";
    if (e.target.checkValidity()) {
      if (password === password2) {
        let formdata = {
          email: email,
          business_name: businessName,
          business_address: businessAddress,
          representative_full_name: representativeName,
          password: password,
          password2: password2,
        };
        console.log(formdata);
        axios
          .post(
            url + "/register/",
            { ...formdata },
            { "content-type": "application/json" }
          )
          .then((resp) => resp.data)
          .then((data) => console.log(data))
          .then(() => history.push("/login"))
          .catch((err) => {
            console.log(err.response.data);
            if (err.response.data.email) {
              alert(`Failed signup: Email already in use`);
            } else {
              alert(`Failed signup: ${JSON.stringify(err.response.data)}`);
            }
          });
      } else {
        alert("both passwords don't match");
      }
    }
  };
  return (
    <div className="container mt-5 col-md-6">
      <form onSubmit={handleSubmit} noValidate className="needs-validation">
        <h3 className="mb-4 mt-4">SignUp</h3>
        <div className="form-group mb-4 mt-4">
          <label>Business name</label>
          <br />
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Business name"
            required
          />
        </div>
        <div className="form-group mb-4 mt-4">
          <label>Business Address</label>
          <br />
          <input
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Business Address"
            required
          />
        </div>
        <div className="form-group mb-4 mt-4">
          <label>Representative full name</label>
          <br />
          <input
            value={representativeName}
            onChange={(e) => setRepresentativeName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Representative full name"
            required
          />
        </div>
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
            required
            pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
          />
          <div className="invalid-feedback">
            Please enter a password with minimum eight characters, containing
            one digit, one special character, one uppercase letter, one
            lowercase letter
          </div>
        </div>
        <div className="form-group mb-4 mt-4">
          <label>Confirm Password</label>
          <br />
          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter password Again"
            required
            pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
          />
          <div className="invalid-feedback">
            Please enter a password with minimum eight characters, containing
            one digit, one special character, one uppercase letter, one
            lowercase letter
          </div>
        </div>
        <br />
        <button type="submit" className="mb-4 mt-4 btn btn-primary btn-block">
          SignUp
        </button>
        <br />
        <p>
          Already registered <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
