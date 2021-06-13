import React from "react";
import { Redirect } from "react-router";

const Logout = () => {
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("email");

  localStorage.removeItem("is_supplier");
  localStorage.removeItem("is_staff");
  localStorage.removeItem("business_name");
  localStorage.removeItem("business_address");

  return <Redirect to="/" />;
};

export default Logout;
