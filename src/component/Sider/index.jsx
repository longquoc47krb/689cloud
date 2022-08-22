import { Menu } from "antd";
import "antd/dist/antd.css";
import Sider from "antd/lib/layout/Sider";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
const { Item } = Menu;

const SiderBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const sidebarNavItems = [
    {
      display: t("file-management"),
      to: "/files",
    },
    {
      display: t("user-group-management"),
      to: "/group",
    },
    {
      display: t("users-management"),
      to: "/users",
    },
    {
      display: t("message-management"),
      to: "/messages",
    },
    {
      display: t("dashboard"),
      to: "/dashboard",
    },
  ];
  function SelectedKey() {
    switch (location.pathname) {
      case "/files":
        return ["0"];
      case "/group":
        return ["1"];
      case "/users":
        return ["2"];
      case "/messages":
        return ["3"];
      case "/dashboard":
        return ["4"];
      default:
        return ["4"];
    }
  }
  return (
    <div>
      <Sider width={250} style={{ minHeight: "600px", height: "100%" }}>
        <Menu
          mode='inline'
          theme='dark'
          defaultSelectedKeys={SelectedKey}
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
