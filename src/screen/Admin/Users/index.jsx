/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "../../../assets/EditIcon";
import TrashIcon from "../../../assets/TrashIcon";
import AddEditUserModal from "../../../component/AddEditModal";
import { AntdSelect } from "../../../component/AntdInput";
import AntdSearchAutocomplete from "../../../component/AntSearchAutocomplete";
import AntdButton from "../../../component/Button";
import constants from "../../../constants";
import Table from "../../../component/Table";
import {
  openAddModal,
  openEditModal,
} from "../../../redux/slices/adminModalSlice";
import {
  getUsers,
  removeFilter,
  setFilter,
} from "../../../redux/slices/usersSlice";
import { useTranslation } from "react-i18next";
function UsersPage() {
  const modal = useSelector((state) => state.modal);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(
    constants.options[0].value
  );
  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      render: (name) => <h3>{name}</h3>,
    },
    {
      title: t("contract-start"),
      dataIndex: "contractStart",
      render: (contractStart) => <h3>{contractStart}</h3>,
    },
    {
      title: t("contract-end"),
      dataIndex: "contractEnd",
      render: (contractEnd) => <h3>{contractEnd}</h3>,
    },
    {
      title: t("created-date"),
      dataIndex: "date",
      render: (date) => <>{date}</>,
      width: "30%",
    },
    {
      title: t("suspension"),
      dataIndex: "suspension",
      render: (suspension) => <h3>{suspension}</h3>,
    },
    {
      title: t("action"),
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
  useEffect(() => {
    setRecordsPerPage(constants.options[0].value);
  }, [modal]);
  const handleSelect = (value) => {
    setRecordsPerPage(value);
  };
  useEffect(() => {
    dispatch(getUsers(users?.filter));
  }, [users?.filter]);
  // Handlers
  const onEdit = (record) => {
    dispatch(openEditModal({ selectedData: record }));
  };
  const onDelete = (record) => {
    const title = [
      `Are you sure, you want to delete `,
      <span className='text-red-500'>{record.name}</span>,
      ` ?`,
    ];
    Modal.confirm({
      title: [...title],
      okText: "OK",
      okType: "danger",
      onOk: () => {},
    });
  };
  console.log("users", users);
  // handle searchBar
  const onChange = (value) => {
    if (value === "") {
      dispatch(removeFilter());
    }
    setKeyword(value);
  };
  const suggestionSelected = (value) => {
    setKeyword(value);
    dispatch(setFilter({ filter: value }));
  };
  const handlePressEnter = (value) => {
    dispatch(setFilter({ filter: keyword }));
  };
  return (
    <div className='p-[33px]'>
      <div className='flex justify-between mb-4'>
        <AntdButton
          className='antd-button'
          text={t("add-user")}
          onClick={() => dispatch(openAddModal())}
        />
        <AntdSearchAutocomplete
          // dataSource={users?.data?.map((item) => {
          //   return {
          //     value: item.name,
          //     ...item,
          //   };
          // })}
          onSelect={suggestionSelected}
          onChange={onChange}
          onPressEnter={handlePressEnter}
        />
      </div>
      <Table
        data={users?.data}
        isLoading={users?.loading}
        columns={columns}
        recordsPerPage={recordsPerPage}
      />
      {/* <AntdSelect values={constants.options} onChange={handleSelect} /> */}
      <AddEditUserModal
        destroyOnClose
        open={modal.toggle}
        title={modal.isEditting ? "Edit User" : "Add User"}
        selectedData={modal.selectedData}
      />
    </div>
  );
}
export default UsersPage;
