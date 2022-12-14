import React, { useEffect, useState } from "react";
import { Collapse, Modal } from "antd";
import { BiPlusMedical } from "react-icons/bi";
import TrashIcon from "../../../../assets/TrashIcon";
import EditIcon from "../../../../assets/EditIcon";
import TabLayout from "./Modal/TabLayout";
import Table from "../../../../component/Table";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

const Layout = () => {
  const [selected, setSelected] = useState({});
  const [openTabLayOutModal, setOpenTabLayOutModal] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [tabData, setTabData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchSearchBox = async () => {};
    fetchSearchBox();
  }, []);
  const onDelete = (record) => {
    const title = [
      `Are you sure, you want to delete `,
      <span className='text-red-500'>{record.title}</span>,
      ` ?`,
    ];
    Modal.confirm({
      title: [...title],
      okText: "OK",
      okType: "danger",
      onOk: () => {},
    });
  };
  const onEdit = (record) => {
    setIsEditting(true);
    setSelected(record);
  };
  const columns = [
    {
      title: <h1 className='title'>{t("title")}</h1>,
      dataIndex: "title",
      render: (title) => <h3>{title}</h3>,
    },
    {
      title: <h1 className='title'>{t("number-of-search-box")}</h1>,
      dataIndex: "searchFields",
      align: "center",
      render: (searchFields) => <h3>{searchFields.length}</h3>,
    },
    {
      title: <h1 className='title'>{t("action")}</h1>,
      render: (record) => {
        return (
          <div className='flex'>
            <div
              className='cursor-pointer'
              onClick={() => {
                onEdit(record);
                setOpenTabLayOutModal(true);
              }}>
              <EditIcon />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => {
                onDelete(record);
              }}>
              <TrashIcon />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className='w-full h-full min-h-[100vh] bg-white p-5 relative'>
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel header={<h1 className='title'>Tab layout</h1>} showArrow={false}>
          <div className='flex gap-x-2'>
            <button
              onClick={() => setOpenTabLayOutModal(true)}
              className='button bg-[#839C97] text-white px-2 flex gap-x-1 items-center'>
              <BiPlusMedical />
              {t("add-tab")}
            </button>
            <button className='button bg-[#839C97] text-white px-2 flex gap-x-1 items-center'>
              {t("preview")}
            </button>
          </div>
          <Table
            columns={columns}
            className='mt-5'
            data={tabData}
            handleCancel={() => {
              setOpenTabLayOutModal(false);
            }}
          />
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel
          header={<h1 className='title'> {t("search-results")}</h1>}
          showArrow={false}>
          hehee
        </Panel>
      </Collapse>
      <TabLayout
        title={isEditting ? "EDIT TAB LAYOUT" : "ADD TAB LAYOUT"}
        open={openTabLayOutModal}
        handleCancel={() => {
          setOpenTabLayOutModal(false);
          setSelected({});
        }}
        selectedData={selected}
      />
    </div>
  );
};

export default Layout;
