import React from "react";

const Footer = () => {
  return (
    <div className="bg-dark text-white p-3">
      <div className="row">
        <div className="col-6 text-start">&copy;{new Date().getFullYear()}</div>
        <div className="col-6 text-end">AS_Browser</div>
      </div>
    </div>
  );
};

export default Footer;
