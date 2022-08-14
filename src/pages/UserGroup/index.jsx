/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import AddEditUserGroupModal from "../../components/AddEditUserGroupModal";
import AntdSearchAutocomplete from "../../components/AntSearchAutocomplete";
import AntdButton from "../../components/Button";
import AntdSelect from "../../components/Select";
import { AntdTable } from "../../components/Table";
import httpRequest from "../../services/httpRequest";
function UserGroup(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState(null);
  const options = [
    { value: 5, text: "5" },
    { value: 10, text: "10" },
    { value: 20, text: "20" },
    { value: 50, text: "50" },
    { value: 100, text: "100" },
  ];
  const [recordsPerPage, setRecordsPerPage] = useState(options[0].value);
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
    setRecordsPerPage(options[0].value);
  }, []);
  const handleSelect = (value) => {
    setRecordsPerPage(value);
  };
  // Handlers

  const onReset = () => {
    setSelected({});
  };
  const onEdit = (record) => {
    setIsEditting(true);
    setModalOpen(true);
    setSelected(record);
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
    setLoading(true);
    const fetchData = async () => {
      const res = await httpRequest({
        url: "/userGroup",
        method: "GET",
        params: {
          name: filter,
        },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [filter]);
  // handle searchBar
  const onChange = (value) => {
    if (value === "") {
      setFilter(null);
    }
    setKeyword(value);
  };

  const suggestionSelected = (value) => {
    setKeyword(value);
    setFilter(value);
  };
  const handlePressEnter = (value) => {
    setFilter(keyword);
  };
  return (
    <div className='p-[33px]'>
      <div className='flex justify-between mb-4'>
        <AntdButton
          className='antd-button'
          text='Add User Group'
          onClick={() => {
            setModalOpen(true);
          }}
        />
        <AntdSearchAutocomplete
          dataSource={data.map((item) => {
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
        data={data}
        isLoading={isLoading}
        columns={columns}
        recordsPerPage={recordsPerPage}
      />
      <AntdSelect values={options} onChange={handleSelect} />
      <AddEditUserGroupModal
        title={isEditting ? "Edit User Group" : "Add User Group"}
        open={modalOpen}
        selectedData={selected ?? null}
        handleCancel={() => {
          setModalOpen(false);
          setIsEditting(false);
          onReset();
        }}
        handleOK={() => setModalOpen(false)}
      />
    </div>
  );
}

export default UserGroup;
