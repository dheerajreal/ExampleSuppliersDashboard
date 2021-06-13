import axios from "axios";
import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import url from "../Utils/url";

const Home = () => {
  const history = useHistory();
  const refresh_token = localStorage.getItem("refresh_token");
  console.log(refresh_token);

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
        } else {
          history.push("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
  }, [history, refresh_token]);

  if (!refresh_token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <div className="jumbotron mt-5 mx-auto">
          <h1>redirecting</h1>
        </div>
      </>
    );
  }
};

export default Home;
