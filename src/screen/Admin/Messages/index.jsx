import React from "react";
import { Tabs } from "antd";
import PageTitle from "./PageTitle";
import SearchBox from "./SearchBox";
import Layout from "./Layout";
import { useTranslation } from "react-i18next";
const { TabPane } = Tabs;
const Messages = () => {
  const { t } = useTranslation();
  return (
    <div className='p-8'>
      <Tabs defaultActiveKey='1' type='card'>
        <TabPane tab={<h1 className='title'>{t("page-title")}</h1>} key='1'>
          <PageTitle />
        </TabPane>
        <TabPane tab={<h1 className='title'>{t("search-box")}</h1>} key='2'>
          <SearchBox />
        </TabPane>
        <TabPane tab={<h1 className='title'>{t("layout")}</h1>} key='3'>
          <Layout />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Messages;
