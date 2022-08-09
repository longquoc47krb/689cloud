import { Layout } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SiderBar from "../components/Sidebar";
const { Header, Content } = Layout;
const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
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
