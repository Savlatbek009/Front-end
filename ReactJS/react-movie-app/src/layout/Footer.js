import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-danger p-3 text-white text-center">
        <div className="container">
          <div className="row">
            <div className="col-6">
              &copy;{new Date().getFullYear()} Copy Right
            </div>
            <div className="col-6">Movie App</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
