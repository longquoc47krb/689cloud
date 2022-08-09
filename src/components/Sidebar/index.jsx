import { Menu } from "antd";
import "antd/dist/antd.css";
import Sider from "antd/lib/layout/Sider";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const sidebarNavItems = [
  {
    display: "Table drag-n-drop",
    to: "/table",
  },
  {
    display: "Todo (like Trello)",
    to: "/todo",
  },
];
const SiderBar = () => {
  return (
    <div>
      <Sider width={250} style={{ minHeight: "600px", height: "100%" }}>
        <Menu
          mode='inline'
          theme='dark'
          defaultSelectedKeys={["0"]}
          style={{ height: "100%", borderRight: 0 }}>
          {sidebarNavItems.map((item, index) => (
            <Menu.Item key={index} style={{ color: "white" }}>
              <Link to={item.to}>{item.display}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </div>
  );
};

export default SiderBar;
