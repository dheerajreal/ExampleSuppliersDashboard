import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import SignupLogin from "../Layouts/SignupLogin";
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
          .then((data) => {
            console.log(data);
            toast.success("Signup success");
            history.push("/login");
          })
          .catch((err) => {
            console.log(err.response.data);
            if (err.response.data.email) {
              toast.error(`Failed signup: ${err.response.data.email}`);
            } else {
              toast.error(
                `Failed signup: ${JSON.stringify(err.response.data)}`
              );
            }
          });
      } else {
        toast.error("Error: both passwords don't match");
      }
    }
  };
  return (
    <SignupLogin>
      <form onSubmit={handleSubmit} noValidate className="needs-validation">
        <h3 className="mb-4 mt-4">Signup</h3>
        <div className="form-group mb-4 mt-4">
          <label className="text-uppercase">Business name</label>
          <br />
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Business name"
            required
          />
          <div className="invalid-feedback">Required </div>
        </div>
        <div className="form-group mb-4 mt-4">
          <label className="text-uppercase">Business Address</label>
          <br />
          <input
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Business Address"
            required
          />
          <div className="invalid-feedback">Required </div>
        </div>
        <div className="form-group mb-4 mt-4">
          <label className="text-uppercase">Representative full name</label>
          <br />
          <input
            value={representativeName}
            onChange={(e) => setRepresentativeName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Representative full name"
            required
          />
          <div className="invalid-feedback">Required </div>
        </div>
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
          <label className="text-uppercase">Confirm Password</label>
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
            Enter the same password you have entered above
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
        <br />
        <br />

        <p>
          Already registered <Link to="/login">Login</Link>
        </p>
      </form>
    </SignupLogin>
  );
};

export default Signup;
