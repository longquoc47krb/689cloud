import React, { useEffect, useState } from "react";
import { Card, Divider, Tabs } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { loginStatusSelector } from "../redux/slices/authSlice";
import { userInfoSelector } from "../redux/slices/userSlice";
import Profile from "./Profile";
import GroupContent from "./GroupContent";
const { TabPane } = Tabs;
const Dashboard = (props) => {
  const { role } = props;
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
          {role}
        </Divider>
        <Tabs activeKey={activeKey} onChange={changeTab}>
          <TabPane tab='Profile' key='1'>
            <Profile loading={userInfo ? false : true} role={role} />
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

export default Dashboard;
