import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginStatusSelector, logout } from "../redux/slices/authSlice";

function Welcome() {
  const loginStatus = useSelector(loginStatusSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Successfully logged out");
    navigate("/");
  };
  return (
    <div>
      <p className='title'>
        status:
        <span
          className={
            loginStatus?.status === 200 ? "text-green-500" : "text-red-600"
          }>
          {loginStatus?.status}
        </span>
      </p>
      <p className='title'>
        message:{" "}
        <span
          className={
            loginStatus?.status === 200 ? "text-green-500" : "text-red-600"
          }>
          {loginStatus?.message}
        </span>
      </p>
      <Button
        onClick={handleLogOut}
        style={{
          background: "#392999",
          color: "white",
          position: "absolute",
          bottom: 24,
        }}>
        Log out
      </Button>
    </div>
  );
}

export default Welcome;
