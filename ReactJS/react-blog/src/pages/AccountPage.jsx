import React, { useContext, useEffect, useState } from "react";
import { TOKEN } from "../constant";
import Cookies from "js-cookie";
import request from "../server/index";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [changedData, setChangedData] = useState({});
  const [changedPassword, setChangedPassword] = useState({});

  const navigate = useNavigate();

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/login");
  };

  const getInfo = async () => {
    try {
      const res = await request.get("auth/me");
      setData(res.data);
      setChangedData(res.data);
      setChangedPassword({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      toast.error("Server Error");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await request.put("auth/details", changedData);
      toast.success("Successfull changed");
    } catch (error) {
      toast.error("Invalid");
    }
  };

  const upDatePassword = async (e) => {
    e.preventDefault();
    console.log(changedPassword);
    try {
      await request.put("auth/password", changedPassword);
      toast.success("Successfull changed");
      setChangedPassword("");
    } catch (error) {
      if (
        changedPassword.currentPassword === "" ||
        changedPassword.newPassword === ""
      ) {
        toast.error("Please Fill");
      } else if (
        changedPassword.currentPassword === changedPassword.newPassword
      ) {
        toast.error("Enter new Password");
      } else {
        toast.error("Current password is incorrect");
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="container">
      <h1 className="form-title">Account Mange</h1>
      <hr />
      <div className="account-row">
        <form className="form" onSubmit={submit}>
          <center>
            {" "}
            <h1 className="post-title">Update User Info</h1>
          </center>

          <input
            type="text"
            onChange={(e) => {
              setChangedData({ ...data, first_name: e.target.value });
            }}
            value={changedData?.first_name}
            name="first_name"
            placeholder="Firstname"
            className="form-input"
          />
          <input
            type="text"
            onChange={(e) => {
              setChangedData({ ...data, last_name: e.target.value });
            }}
            value={changedData?.last_name}
            name="last_name"
            placeholder="Lastname"
            className="form-input"
          />
          <input
            type="text"
            onChange={(e) => {
              setChangedData({ ...data, username: e.target.value });
            }}
            value={changedData?.username}
            name="username"
            placeholder="Username"
            className="form-input"
          />
          <input
            type="text"
            onChange={(e) => {
              setChangedData({ ...data, info: e.target.value });
            }}
            value={changedData?.info}
            name="info"
            placeholder="info"
            className="form-input"
          />
          <input
            type="number"
            onChange={(e) => {
              setChangedData({ ...data, phoneNumber: e.target.value });
            }}
            value={changedData?.phoneNumber}
            name="phoneNumber"
            placeholder="Number"
            className="form-input"
          />
          <input
            type="text"
            value={changedData?.address}
            onChange={(e) => {
              setChangedData({ ...data, address: e.target.value });
            }}
            name="address"
            placeholder="Address"
            className="form-input"
          />
          <button type="submit" className="btn-yellow">
            Update
          </button>
        </form>
        <form className="form" onSubmit={upDatePassword}>
          <center>
            {" "}
            <h1 className="post-title">Update Password</h1>
          </center>

          <input
            type="text"
            onChange={(e) => {
              setChangedPassword({
                ...changedPassword,
                currentPassword: e.target.value,
              });
            }}
            name="currentPassword"
            placeholder="Current Password"
            className="form-input"
          />
          <input
            type="text"
            onChange={(e) => {
              setChangedPassword({
                ...changedPassword,
                newPassword: e.target.value,
              });
            }}
            name="newPassword"
            placeholder="New Password"
            className="form-input"
          />
          <button type="submit" className="btn-yellow">
            Change Password
          </button>
          <center>
            <button className="btn-white" onClick={logout}>
              Log out
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default AccountPage;
