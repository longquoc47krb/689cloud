import React from "react";
import { Tabs } from "antd";
import PageTitle from "./PageTitle";
import SearchBox from "./SearchBox";
import Layout from "./Layout";
import EmailTab from "./Email";
const { TabPane } = Tabs;
const Messages = () => {
  return (
    <div className='p-8'>
      <Tabs defaultActiveKey='1' type='card'>
        <TabPane tab={<h1 className='title'>Page Title</h1>} key='1'>
          <PageTitle />
        </TabPane>
        <TabPane tab={<h1 className='title'>Search Box</h1>} key='2'>
          <SearchBox />
        </TabPane>
        <TabPane tab={<h1 className='title'>Layout</h1>} key='3'>
          <Layout />
        </TabPane>
        <TabPane tab={<h1 className='title'>Email</h1>} key='4'>
          <EmailTab />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Messages;
