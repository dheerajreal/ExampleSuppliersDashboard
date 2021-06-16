import React from "react";
import logo from "../Utils/logo.png";
const LogoBox = () => {
  return (
    <div className="jumbotron mt-4">
      <img style={{ maxWidth: "98%" }} src={logo} alt="logo" />
    </div>
  );
};

export default LogoBox;
