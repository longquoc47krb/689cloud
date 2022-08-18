import React, { memo, useEffect, useState } from "react";
import { Card, Divider, Tabs } from "antd";
import UserInfo from "./UserInfo";
import GroupContent from "./GroupContent";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { loginStatusSelector } from "../redux/slices/authSlice";
import { userInfoSelector } from "../redux/slices/userSlice";
const { TabPane } = Tabs;
const UserPage = () => {
  console.log("UsePag");
  const [activeKey, setActiveKey] = useState();
  const loginStatus = useSelector(loginStatusSelector);
  const userInfo = useSelector(userInfoSelector);
  useEffect(() => {
    if (loginStatus?.status === 200) {
      toast.success("Successfully logged in");
    }
  }, [loginStatus]);
  const changeTab = (activeKey) => {
    setActiveKey(activeKey);
  };
  return (
    <div className='bg-gray-200 flex items-center justify-center w-full h-[120vh] relative'>
      <Card style={{ width: 700, minHeight: 600 }}>
        <Divider
          orientation='left'
          orientationMargin='0'
          style={{ color: "black" }}>
          Profile
        </Divider>
        <Tabs activeKey={activeKey} onChange={changeTab}>
          <TabPane tab='User Info' key='1'>
            <UserInfo loading={userInfo ? false : true} />
          </TabPane>
          <TabPane tab='Group' key='2'>
            <GroupContent />
          </TabPane>
        </Tabs>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default memo(UserPage);
