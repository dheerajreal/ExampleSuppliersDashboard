import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar";
import url from "../Utils/url";

const Admin = () => {
  const refresh_token = localStorage.getItem("refresh_token");
  const history = useHistory();
  const businessName = localStorage.getItem("business_name");
  const [accounts, setAccounts] = useState([]);

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

        if (!is_staff) {
          history.push("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
  }, [history]);

  useEffect(() => {
    axios
      .get(url + "/accounts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((data) => setAccounts(data.data));
  }, []);

  // useEffect(() => {
  //   console.log(accounts);
  // }, [accounts]);

  if (!refresh_token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <Navbar />

        <div className="container">
          <h1>Hello, {businessName == "null" ? "" : businessName} Admin</h1>
          <h2> </h2>
        </div>
        <br />
        <hr />
        <div className="container">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="row">id</th>
                <th>Business Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => {
                return (
                  <tr key={acc.pk}>
                    <th scope="row">{acc.pk}</th>
                    <td>{acc.business_name}</td>
                    <td>{acc.email}</td>
                    <td>{acc.business_address}</td>
                    <td>{acc.is_supplier ? "Supplier" : "Staff"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        </div>
      </>
    );
  }
};

export default Admin;
