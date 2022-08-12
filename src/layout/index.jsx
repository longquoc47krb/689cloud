/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { Layout } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/689cloud.png";
import avatar from "../assets/avatar.png";
import SiderBar from "../components/Sider";
const { Header, Content } = Layout;
const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Header
        className='bg-white flex justify-between items-center px-10'
        style={{
          padding: 0,
        }}>
        <img src={logo} />
        <img src={avatar} />
      </Header>
      <Layout
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <SiderBar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
