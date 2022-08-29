/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import logo from "../../../assets/689cloud.png";
import avatar from "../../../assets/avatar.png";
import LanguageSwitch from "../../../component/LanguageSwitch";
import SiderBar from "../../../component/Sider";
import { logout } from "../../../redux/slices/authSlice";
import { clearUserInfo } from "../../../redux/slices/userSlice";
const { Header, Content } = Layout;
const AdminLayout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const menu = (
    <Menu
      items={[
        {
          label: (
            <p
              onClick={() => {
                dispatch(logout());
                dispatch(clearUserInfo());
              }}>
              {t("log-out")}
            </p>
          ),
          key: "0",
        },
      ]}
    />
  );

  return (
    <Layout>
      <Header
        className='bg-white flex justify-between items-center px-10 relative'
        style={{
          padding: 0,
        }}>
        <img src={logo} />
        <LanguageSwitch className='absolute right-20 top-4' />
        <Dropdown overlay={menu} trigger={["click"]}>
          <img src={avatar} />
        </Dropdown>
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

export default AdminLayout;
