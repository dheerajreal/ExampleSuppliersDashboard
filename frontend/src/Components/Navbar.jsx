import React from "react";

const Navbar = () => {
  return (
    <div className="mb-3 shadow">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand text-dark" href="/">
            Simfoni
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link text-dark" href="/">
                Home
              </a>
              <a className="nav-item nav-link text-dark" href="/">
                Profile
              </a>
              <a className="nav-item nav-link text-dark" href="/">
                Invoices
              </a>
              <a className="nav-item nav-link text-dark" href="/">
                Payments
              </a>
              <a className="nav-item nav-link text-dark" href="/">
                Catalog
              </a>
              <a className="nav-item nav-link text-dark" href="/logout">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
