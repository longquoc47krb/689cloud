import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, userInfoSelector } from "../redux/slices/userSlice";

function UserInfo() {
  const userInfo = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
    console.log("userInfo", userInfo);
  }, []);
  return (
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
    </div>
  );
}

export default UserInfo;
