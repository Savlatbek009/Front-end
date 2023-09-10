import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <nav className="bg-custom py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <NavLink className="nav-link fs-4" to={"/debts"}>
          Debts
        </NavLink>

        <NavLink className="nav-link fs-4" to={"/transaction"}>
          Transaction
        </NavLink>
        <div className="d-flex align-items-center gap-3 text-white">
          <h4>{localStorage.getItem("user")}</h4>
          <NavLink
            className="nav-link fs-4 bg-danger py-1 px-4 rounded"
            onClick={logout}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
