import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../component/Table";
import { getGroupContent, groupListSelector } from "../redux/slices/groupSlice";
import { userFromStorage } from "../redux/slices/userSlice";
import { TbEdit, TbTrash } from "react-icons/tb";
function GroupContent() {
  const groupList = useSelector(groupListSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupContent(userFromStorage.domain));
  }, [dispatch]);
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
                // setOpenTabLayOutModal(true);
              }}>
              <TbEdit className='text-xl' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => {
                // onDelete(record);
              }}>
              <TbTrash className='text-xl' />
            </div>
          </div>
        );
      },
    },
  ];
  const onEdit = (record) => {};
  return (
    <div>
      <p className='title'>GroupContent</p>
      <Table
        columns={columns}
        loading={groupList?.loading}
        data={groupList}
        recordsPerPage={4}
      />
    </div>
  );
}

export default GroupContent;
