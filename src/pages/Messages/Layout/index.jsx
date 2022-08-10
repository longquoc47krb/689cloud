import React, { useState } from "react";
import { AntdTable } from "./../../../components/Table/index";
import { Collapse } from "antd";
import { BiPlusMedical } from "react-icons/bi";
import TrashIcon from "../../../assets/TrashIcon";
import EditIcon from "../../../assets/EditIcon";
import TabLayout from "./Modal/TabLayout";
const { Panel } = Collapse;
const columns = [
  {
    title: <h1 className='title'>Title</h1>,
    dataIndex: "title",
    render: (title) => <h3>{title}</h3>,
  },
  {
    title: <h1 className='title'>Number of search box</h1>,
    dataIndex: "numberOfSearchBox",
    align: "center",
    render: (numberOfSearchBox) => <h3>{numberOfSearchBox}</h3>,
  },
  {
    title: <h1 className='title'>Action</h1>,
    render: (record) => {
      return (
        <div className='flex'>
          <div
            className='cursor-pointer'
            onClick={() => {
              //onEdit(record);
            }}>
            <EditIcon />
          </div>
          <div
            className='cursor-pointer'
            onClick={() => {
              // onDelete(record);
            }}>
            <TrashIcon />
          </div>
        </div>
      );
    },
  },
];
const Layout = () => {
  const [openTabLayOutModal, setOpenTabLayOutModal] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  return (
    <div className='w-full h-full min-h-[100vh] bg-white p-5 relative'>
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel header={<h1 className='title'>Tab layout</h1>} showArrow={false}>
          <div className='flex gap-x-2'>
            <button
              onClick={() => setOpenTabLayOutModal(true)}
              className='button bg-[#839C97] text-white px-2 flex gap-x-1 items-center'>
              <BiPlusMedical />
              ADD TAB
            </button>
            <button className='button bg-[#839C97] text-white px-2 flex gap-x-1 items-center'>
              PREVIEW
            </button>
          </div>
          <AntdTable
            columns={columns}
            className='mt-5'
            handleCancel={() => setOpenTabLayOutModal(false)}
          />
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel
          header={<h1 className='title'>Search results</h1>}
          showArrow={false}>
          hehee
        </Panel>
      </Collapse>
      <TabLayout
        title={isEditting ? "EDIT TAB LAYOUT" : "ADD TAB LAYOUT"}
        open={openTabLayOutModal}
        handleCancel={() => setOpenTabLayOutModal(false)}
      />
    </div>
  );
};

export default Layout;
