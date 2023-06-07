import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <a className="navbar-brand">React</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-right"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <a className="nav-link active">Movies</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
