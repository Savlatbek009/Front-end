import Cookies from "js-cookie";
import React, { useContext } from "react";
import request from "../server/index";
import { TOKEN } from "../constant";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (
      !e.target.first_name.value ||
      !e.target.last_name.value ||
      !e.target.username.value ||
      !e.target.username.value ||
      !e.target.password.value ||
      !e.target.c_password.value
    ) {
      toast.error("Plese fill all fields");
    } else if (e.target.password.value !== e.target.c_password.value) {
      toast.error("Password and confirm password are must be same");
    } else {
      try {
        const user = {
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          username: e.target.username.value,
          password: e.target.password.value,
        };
        const res = await request.post("auth/register", user);
        Cookies.set(TOKEN, res.data.token);
        toast.success("Alls are ok. You are redricting");
        setIsAuthenticated(true);
        navigate("/my-posts");
      } catch (error) {
        toast.error("Username or password is incorrect");
      }
    }
  };
  return (
    <section className="register">
      <div className="container">
        <h1 className="form-title">Register</h1>
        <form className="form" onSubmit={submit}>
          <input
            type="text"
            name="first_name"
            placeholder="Firstname"
            className="form-input"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Lastname"
            className="form-input"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
          />
          <input
            type="password"
            name="c_password"
            placeholder="Confirm password"
            className="form-input"
          />
          <button className="btn-yellow">Register</button>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
