import React, { useEffect, useState } from "react";
import httpRequest from "../../services/api/httpRequest";
import { BiTrash } from "react-icons/bi";
import { Modal } from "antd";
import DraggableTable from "../../components/Table";
const Table = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await httpRequest({
        url: "/users",
        method: "GET",
      });
      console.log("response", response);
      setLoading(false);
      setData(response);
    };
    fetchData();
  }, []);
  console.log("data", data);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <h3>{id}</h3>,
    },
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
                onDelete(record);
              }}>
              <BiTrash />
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
  console.log("data", data);
  return (
    <div style={{ padding: "5rem" }}>
      <DraggableTable columns={columns} dataSource={data} />
    </div>
  );
};

export default Table;
