import { Modal } from "antd";
import React from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useDispatch } from "react-redux";
import Table from "../component/Table";
import { closeModal } from "../redux/slices/groupSlice";

const GroupDetails = (props) => {
  const { loading, data, title, open } = props;
  const dispatch = useDispatch();
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
      title: <h1>File name</h1>,
      dataIndex: "file_name",
      align: "center",
      render: (file_name) => <h3>{file_name}</h3>,
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
  const onEdit = (record) => {};
  return (
    <Modal
      title={title}
      centered
      visible={open}
      onCancel={() => dispatch(closeModal())}
      width={800}>
      <Table
        columns={columns}
        data={data}
        loading={loading}
        recordsPerPage={4}
      />
    </Modal>
  );
};

export default GroupDetails;
