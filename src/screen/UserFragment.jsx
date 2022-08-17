import React, { memo, useEffect } from "react";
import { Card, Divider, Tabs } from "antd";
import UserInfo from "./UserInfo";
import GroupContent from "./GroupContent";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginStatusSelector, userSelector } from "../redux/slices/authSlice";
import { getGroupContent } from "../redux/slices/groupSlice";
const { TabPane } = Tabs;
const UserPage = () => {
  console.log("UsePag");
  const loginStatus = useSelector(loginStatusSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
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
          <TabPane tab='User Info' key='1'>
            <UserInfo />
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
