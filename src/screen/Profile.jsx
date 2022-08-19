import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Skeleton } from "antd";
import {
  clearUserInfo,
  getProfile,
  getProfileFakeUser,
  userInfoSelector,
} from "../redux/slices/userSlice";
import { logout } from "../redux/slices/authSlice";

function Profile(props) {
  const { loading, role } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "Admin") {
      dispatch(getProfile());
    } else {
      dispatch(getProfileFakeUser());
    }
  }, [dispatch, role]);
  const userInfo = useSelector(userInfoSelector);
  const handleLogOut = () => {
    dispatch(logout());
    dispatch(clearUserInfo());
    toast.success("Successfully logged out");
    navigate("/login");
  };
  return (
    <Skeleton active loading={loading}>
      <div>
        <p className='title'>
          ID:
          <span className='ml-5 text-green-500'>{userInfo?.id}</span>
        </p>
        <p className='title'>
          Company Id:
          <span className='ml-5 text-green-500'>{userInfo?.company_id}</span>
        </p>
        <p className='title'>
          Name:
          <span className='ml-5 text-green-500'>{userInfo?.name}</span>
        </p>
        <p className='title'>
          Domain:
          <span className='ml-5 text-green-500'>{userInfo?.domain}</span>
        </p>
        <p className='title'>
          Role level:
          <span className='ml-5 text-green-500'>{userInfo?.role_level}</span>
        </p>
        <p className='title'>
          Be User ID:
          <span className='ml-5 text-green-500'>{userInfo?.be_user_id}</span>
        </p>
        <p className='title'>
          Card Number:
          <span className='ml-5 text-green-500'>{userInfo?.card_number}</span>
        </p>
        <p className='title'>
          Token API key:
          <span className='ml-5 text-green-500'>{userInfo?.token_api_key}</span>
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
    </Skeleton>
  );
}

export default Profile;
