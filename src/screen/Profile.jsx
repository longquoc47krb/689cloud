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
import { useTranslation } from "react-i18next";

function Profile(props) {
  const { loading, role } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    toast.success(t("logout-msg"));
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
          {t("company-id")}
          <span className='ml-5 text-green-500'>{userInfo?.company_id}</span>
        </p>
        <p className='title'>
          {t("name")}
          <span className='ml-5 text-green-500'>{userInfo?.name}</span>
        </p>
        <p className='title'>
          {t("domain")}
          <span className='ml-5 text-green-500'>{userInfo?.domain}</span>
        </p>
        <p className='title'>
          {t("role-level")}
          <span className='ml-5 text-green-500'>{userInfo?.role_level}</span>
        </p>
        <p className='title'>
          {t("be-user-id")}
          <span className='ml-5 text-green-500'>{userInfo?.be_user_id}</span>
        </p>
        <p className='title'>
          {t("card-number")}
          <span className='ml-5 text-green-500'>{userInfo?.card_number}</span>
        </p>
        <p className='title'>
          {t("token-api-key")}
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
          {t("log-out")}
        </Button>
      </div>
    </Skeleton>
  );
}

export default Profile;
