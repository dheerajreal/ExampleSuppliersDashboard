import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Dummycontent from "../Components/Dummycontent";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import url from "../Utils/url";

const Profile = () => {
  const refresh_token = localStorage.getItem("refresh_token");
  const businessName = localStorage.getItem("business_name");
  const [formEditingDisabled, setFormEditingDisabled] = useState(true);
  const [primaryName, setPrimaryName] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [secondaryName, setSecondaryName] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");

  const history = useHistory();
  useEffect(() => {
    axios
      .get(url + "/myaccount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("is_supplier", data.data.is_supplier);
        localStorage.setItem("is_staff", data.data.is_staff);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("business_name", data.data.business_name);
        localStorage.setItem("business_address", data.data.business_address);
      })
      .then(() => {
        let is_staff = localStorage.getItem("is_staff");
        console.log(is_staff);
        is_staff = String(is_staff).toLowerCase() === "true";
        console.log(is_staff);

        if (is_staff) {
          history.push("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
  }, [history]);

  useEffect(() => {
    axios
      .get(url + "/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((data) => {
        console.log(data);
        setPrimaryEmail(data.data.primary_email || "");
        setPrimaryName(data.data.primary_full_name || "");
        setPrimaryPhone(data.data.primary_phone || "");
        setSecondaryEmail(data.data.secondary_email || "");
        setSecondaryName(data.data.secondary_full_name || "");
        setSecondaryPhone(data.data.secondary_phone || "");
      })
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
        // history.push("/login");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.checkValidity());
    e.target.className = "was-validated";

    if (e.target.checkValidity()) {
      let formdata = {
        primary_full_name: primaryName,
        primary_email: primaryEmail,
        primary_phone: primaryPhone,
        secondary_full_name: secondaryName,
        secondary_email: secondaryEmail,
        secondary_phone: secondaryPhone,
      };
      console.log(formdata);
      axios
        .put(
          url + "/profile/",
          { ...formdata },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((resp) => resp.data)
        .then((data) => {
          console.log(data);
          setFormEditingDisabled(true);
          toast.success("successfully updated");
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          toast.error(`An Error occurred`);
        });
    }
  };

  if (!refresh_token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <Navbar />
        <div className="container">
          <h1>Hello, {businessName}</h1>
        </div>
        <br />
        <Dummycontent />
        <hr />
        <div className="container">
          <form onSubmit={handleSubmit} noValidate className="needs-validation">
            <div className="row">
              <div className="col">
                <h3 className="mb-4 mt-4">Primary Representative</h3>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Email address</label>
                  <br />
                  <input
                    value={primaryEmail}
                    onChange={(e) => setPrimaryEmail(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    disabled={formEditingDisabled}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  />
                  <div className="invalid-feedback">Please enter an email</div>
                </div>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Name</label>
                  <br />
                  <input
                    value={primaryName}
                    onChange={(e) => setPrimaryName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    required
                    disabled={formEditingDisabled}
                  />
                  <div className="invalid-feedback">Please Enter your Name</div>
                </div>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Phone number</label>
                  <br />
                  <input
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    required
                    disabled={formEditingDisabled}
                    pattern="^[0-9+-]{8,20}$" // 8 or more characters, + symbol and - separator
                  />
                  <div className="invalid-feedback">
                    Please Enter a valid Phone number, (at least 8 characters,
                    dashes allowed)
                  </div>
                </div>
                <br />

                <br />
              </div>
              <div className="col">
                <h3 className="mb-4 mt-4">Secondary Representative</h3>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Email address</label>
                  <br />
                  <input
                    value={secondaryEmail}
                    onChange={(e) => setSecondaryEmail(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    disabled={formEditingDisabled}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  />
                  <div className="invalid-feedback">Please enter an email</div>
                </div>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Name</label>
                  <br />
                  <input
                    value={secondaryName}
                    onChange={(e) => setSecondaryName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    required
                    disabled={formEditingDisabled}
                  />
                  <div className="invalid-feedback">Please Enter your Name</div>
                </div>
                <div className="form-group mb-4 mt-4">
                  <label className="text-uppercase">Phone number</label>
                  <br />
                  <input
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    required
                    disabled={formEditingDisabled}
                    pattern="^[0-9+-]{8,20}$" // 8 or more characters, + symbol and - separator
                  />
                  <div className="invalid-feedback">
                    Please Enter a valid Phone number, (at least 8 characters,
                    dashes allowed)
                  </div>
                </div>
                <br />

                <br />
              </div>
            </div>

            <button
              type="button"
              className="mb-4 mt-4 btn btn-primary"
              style={{ marginRight: 20 }}
              onClick={(e) => setFormEditingDisabled(!formEditingDisabled)}
            >
              Edit
            </button>
            <button type="submit" className="mb-4 mt-4 btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <Footer />
      </>
    );
  }
};

export default Profile;
