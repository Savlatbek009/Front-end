import Cookies from "js-cookie";
import React, { useContext } from "react";
import request from "../server/index";
import { TOKEN } from "../constant";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      const res = await request.post("auth/login", user);
      Cookies.set(TOKEN, res.data.token);
      setIsAuthenticated(true);

      navigate("/my-posts");
    } catch (error) {
      toast.error("User name or password is incorrect bro :)");
    }
  };
  return (
    <section>
      <div className="container">
        <h1 className="form-title">Login</h1>
        <form className="form" onSubmit={submit}>
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
          <button className="btn-yellow">Login</button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
