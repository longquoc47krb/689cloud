import React, { useEffect, useState } from "react";
import EditIcon from "../../../../assets/EditIcon";
import TrashIcon from "../../../../assets/TrashIcon";
import SearchBoxModal from "./Modal";
import { Modal } from "antd";
import httpRequest from "../../../../services/httpRequest";
import Table from "../../../../component/Table";
import { useTranslation } from "react-i18next";

const SearchBox = () => {
  const [openModal, setModalOpen] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchBoxData, setSearchBoxData] = useState(null);
  const { t } = useTranslation();
  const columns = [
    {
      title: <h1 className='title'>{t("label")}</h1>,
      dataIndex: "label",
      render: (label) => <h3>{label}</h3>,
    },
    {
      title: <h1 className='title'>{t("search-fields")}</h1>,
      dataIndex: "searchFields",
      render: (searchFields) =>
        searchFields.map((searchFields) => (
          <div>
            <h3>{searchFields}</h3>
          </div>
        )),
    },
    {
      title: <h1 className='title'>{t("operation")}</h1>,
      dataIndex: "operation",
      render: (operation) => <h3>{operation}</h3>,
    },
    {
      title: <h1 className='title'>{t("match-value")}</h1>,
      dataIndex: "matchValue",
      render: (matchValue) => <h3>{matchValue}</h3>,
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
  const onDelete = (record) => {
    const title = [
      `Are you sure, you want to delete `,
      <span className='text-red-500'>{record.label}</span>,
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
    setModalOpen(true);
    setSelected(record);
  };
  useEffect(() => {
    const fetchSearchBox = async () => {
      const res = await httpRequest({
        url: "/messages",
        method: "GET",
      });
      setSearchBoxData(res[0].searchBox);
    };
    fetchSearchBox();
  }, []);
  const onReset = () => {
    setSelected({});
  };
  const handleCancel = () => {
    setModalOpen(false);
    onReset();
  };

  return (
    <div className='w-full h-full min-h-[100vh] bg-white p-5 relative'>
      <button
        onClick={() => setModalOpen(true)}
        className='button bg-[#839C97] text-white px-5'>
        {t("add-search-box")}
      </button>
      <Table columns={columns} className='mt-5' data={searchBoxData} />
      <SearchBoxModal
        title={isEditting ? "EDIT SEARCH BOX" : "ADD SEARCH BOX"}
        open={openModal}
        handleCancel={handleCancel}
        selectedData={selected}
      />
    </div>
  );
};

export default SearchBox;
