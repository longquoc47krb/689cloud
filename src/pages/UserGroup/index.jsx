/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import AddEditUserGroupModal from "../../components/AddEditUserGroupModal";
import AntdSearchAutocomplete from "../../components/AntSearchAutocomplete";
import AntdButton from "../../components/Button";
import AntdSelect from "../../components/Select";
import { AntdTable } from "../../components/Table";
import constants from "../../constants";
import { openAddModal, openEditModal } from "../../redux/slices/modalSlice";
import {
  getUserGroups,
  removeFilter,
  setFilter,
} from "../../redux/slices/usergroupSlice";
import httpRequest from "../../services/httpRequest";
function UserGroup(props) {
  const modal = useSelector((state) => state.modal);
  const usergroup = useSelector((state) => state.usergroup);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(
    constants.options[0].value
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <h3>{name}</h3>,
    },
    {
      title: "Max User",
      dataIndex: "maxUser",
      render: (maxUser) => <h3>{maxUser}</h3>,
    },
    {
      title: "Session",
      dataIndex: "session",
      render: (session) => <h3>{session}</h3>,
    },
    {
      title: "Staff Id",
      dataIndex: "staffId",
      render: (staffId) => <>{staffId}</>,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      render: (createdDate) => <h3>{createdDate}</h3>,
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
    setRecordsPerPage(constants.options[0].value);
  }, []);
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
    dispatch(getUserGroups(usergroup.filter));
  }, [usergroup.filter]);
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
          text='Add User Group'
          onClick={() => {
            dispatch(openAddModal());
          }}
        />
        <AntdSearchAutocomplete
          dataSource={usergroup.data.map((item) => {
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
        data={usergroup.data}
        isLoading={usergroup.loading}
        columns={columns}
        recordsPerPage={recordsPerPage}
      />
      <AntdSelect values={constants.options} onChange={handleSelect} />
      <AddEditUserGroupModal
        destroyOnClose
        open={modal.toggle}
        title={modal.isEditting ? "Edit User" : "Add User"}
        selectedData={modal.selectedData}
      />
    </div>
  );
}

export default UserGroup;
