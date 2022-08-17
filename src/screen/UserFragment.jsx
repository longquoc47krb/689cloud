import React, { useEffect } from "react";
import { Card, Divider, Tabs } from "antd";
import UserInfo from "./UserInfo";
import GroupContent from "./GroupContent";
import Welcome from "./Welcome";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { loginStatusSelector } from "../redux/slices/authSlice";
const { TabPane } = Tabs;
const UserPage = () => {
  const loginStatus = useSelector(loginStatusSelector);
  useEffect(() => {
    if (loginStatus?.status === 200) {
      toast.success("Successfully logged in");
    }
  }, []);
  return (
    <div className='bg-gray-200 flex items-center justify-center w-full h-[100vh] relative'>
      <Card style={{ width: 700, minHeight: 550 }}>
        <Divider
          orientation='left'
          orientationMargin='0'
          style={{ color: "black" }}>
          Profile
        </Divider>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Auth' key='1'>
            <Welcome />
          </TabPane>
          <TabPane tab='User Info' key='2'>
            <UserInfo />
          </TabPane>
          <TabPane tab='Group' key='3'>
            <GroupContent />
          </TabPane>
        </Tabs>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default UserPage;
