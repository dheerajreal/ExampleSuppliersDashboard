import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
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


  if (!refresh_token) {
    return <Redirect to="/login" />;
  } else {
    return <h1>hi supplier</h1>;
  }
};

export default Profile;
