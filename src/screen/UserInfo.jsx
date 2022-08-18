import { Button } from "antd";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, userSelector } from "../redux/slices/authSlice";
import { Skeleton } from "antd";
import {
  getProfile,
  userFromStorage,
  userInfoSelector,
} from "../redux/slices/userSlice";

function UserInfo(props) {
  const { loading } = props;
  const userInfo = useSelector(userInfoSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProfile(user.access_token));
    console.log("localstorage userinfo", userFromStorage);
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Successfully logged out");
    navigate("/");
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

export default UserInfo;
