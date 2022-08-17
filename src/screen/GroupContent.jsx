import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../component/Table";
import { getGroupContent, groupListSelector } from "../redux/slices/groupSlice";
// import { userFromStorage } from "../redux/slices/userSlice";
import { TbEdit, TbTrash } from "react-icons/tb";
import { Modal } from "antd";
import { userSelector } from "../redux/slices/authSlice";
import GroupDetails from "./GroupDetails";
import { modalSelector, openModal } from "../redux/slices/modalSlice";
import { userInfoSelector } from "../redux/slices/userSlice";
import {
  getSelectedGroupContent,
  selectedGroupSelector,
} from "../redux/slices/groupDetailSlice";
function GroupContent() {
  const groupList = useSelector(groupListSelector);
  const modal = useSelector(modalSelector);
  const userInfo = useSelector(userInfoSelector);
  const selectedGroup = useSelector(selectedGroupSelector);
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(getGroupContent({ domain: userInfo.domain }));
  }, []);
  console.log("groupList", groupList);

  const columns = [
    {
      title: <h1>ID</h1>,
      dataIndex: "id",
      width: "5%",
      render: (id) => <h3>{id}</h3>,
    },
    {
      title: <h1>Name</h1>,
      dataIndex: "name",
      align: "center",
      render: (name) => <h3>{name}</h3>,
    },
    {
      title: <h1>Number of contents</h1>,
      dataIndex: "number_of_contents_to_display",
      align: "center",
      width: "30%",
      render: (number_of_contents_to_display) => (
        <h3>{number_of_contents_to_display}</h3>
      ),
    },
    {
      title: <h1>Action</h1>,
      align: "center",
      render: (record) => {
        return (
          <div className='flex justify-center'>
            <div
              className='cursor-pointer'
              onClick={() => {
                onEdit(record);
                // testEdit();
              }}>
              <TbEdit className='text-xl' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => {
                onDelete(record);
              }}>
              <TbTrash className='text-xl' />
            </div>
          </div>
        );
      },
    },
  ];
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
  const onEdit = (record) => {
    console.log("record", record);
    console.log("userInfo domain", userInfo.domain);
    dispatch(
      getSelectedGroupContent({ id: record.id, domain: userInfo.domain })
    );

    dispatch(openModal());
    console.log("selectedGroup", selectedGroup);
  };
  return (
    <div>
      <p className='title'>GroupContent</p>
      <Table
        columns={columns}
        loading={groupList?.loading}
        data={groupList}
        recordsPerPage={4}
      />
      <GroupDetails open={modal.toggle} data={selectedGroup} />
    </div>
  );
}

export default GroupContent;
