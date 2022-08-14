import { Menu } from "antd";
import "antd/dist/antd.css";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link } from "react-router-dom";
const { Item } = Menu;
const sidebarNavItems = [
  {
    display: "Files Management",
    to: "/files",
  },
  {
    display: "User Group Management",
    to: "/group",
  },
  {
    display: "Users Management",
    to: "/users",
  },
  {
    display: "Messages Management",
    to: "/messages",
  },
  {
    display: "Dashboard",
    to: "/home",
  },
];
const SiderBar = () => {
  return (
    <div>
      <Sider width={250} style={{ minHeight: "600px", height: "100%" }}>
        <Menu
          mode='inline'
          theme='dark'
          defaultSelectedKeys={["2"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}>
          {sidebarNavItems.map((item, index) => (
            <Item key={index} style={{ color: "white" }}>
              <Link to={item.to}>{item.display}</Link>
            </Item>
          ))}
        </Menu>
      </Sider>
    </div>
  );
};

export default SiderBar;
