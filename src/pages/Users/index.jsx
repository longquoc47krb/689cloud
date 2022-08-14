/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import AddEditUserModal from "../../components/AddEditModal";
import AntdSearchAutocomplete from "../../components/AntSearchAutocomplete";
import AntdButton from "../../components/Button";
import AntdSelect from "../../components/Select";
import { AntdTable } from "../../components/Table";
import { openAddModal, openEditModal } from "../../redux/slices/modalSlice";
import {
  getUsers,
  removeFilter,
  setFilter,
} from "../../redux/slices/userSlice";
function UsersPage() {
  const modalToggle = useSelector((state) => state.modalToggle);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const options = [
    { value: 5, text: "5" },
    { value: 10, text: "10" },
  ];
  const [recordsPerPage, setRecordsPerPage] = useState(options[0].value);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <h3>{name}</h3>,
    },
    {
      title: "Contract Start",
      dataIndex: "contractStart",
      render: (contractStart) => <h3>{contractStart}</h3>,
    },
    {
      title: "Contract End",
      dataIndex: "contractEnd",
      render: (contractEnd) => <h3>{contractEnd}</h3>,
    },
    {
      title: "Created date",
      dataIndex: "date",
      render: (date) => <>{date}</>,
      width: "30%",
    },
    {
      title: "Suspension",
      dataIndex: "suspension",
      render: (suspension) => <h3>{suspension}</h3>,
    },
    {
      title: "Action",
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
    setRecordsPerPage(options[0].value);
  }, [modalToggle]);
  const handleSelect = (value) => {
    setRecordsPerPage(value);
  };
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
  useEffect(() => {
    dispatch(getUsers({ filter: users.filter }));
  }, [users.filter]);
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
          text='Add User'
          onClick={() => dispatch(openAddModal())}
        />
        <AntdSearchAutocomplete
          dataSource={users.data.map((item) => {
            return {
              value: item.name,
              ...item,
            };
          })}
          onSelect={suggestionSelected}
          onChange={onChange}
          onPressEnter={handlePressEnter}
        />
      </div>
      <AntdTable
        data={users.data}
        isLoading={users.loading}
        columns={columns}
        recordsPerPage={recordsPerPage}
      />
      <AntdSelect values={options} onChange={handleSelect} />
      <AddEditUserModal
        destroyOnClose
        open={modalToggle.toggle}
        title={modalToggle.isEditting ? "Edit User" : "Add User"}
        selectedData={modalToggle.selectedData}
      />
    </div>
  );
}
export default UsersPage;
