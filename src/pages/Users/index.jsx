/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import AddEditUserModal from "../../components/AddEditModal";
import AntdSearchAutocomplete from "../../components/AntSearchAutocomplete";
import AntdButton from "../../components/Button";
import AntdSelect from "../../components/Select";
import { AntdTable } from "../../components/Table";
function UsersPage() {
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
  }, []);
  const handleSelect = (value) => {
    setRecordsPerPage(value);
  };
  const onReset = () => {
    setSelected({});
  };
  const onEdit = (record) => {
    setIsEditting(true);
    setModalOpen(true);
    setSelected(record);
    console.loh("modal open:", modalOpen);
    console.loh("selected user:", selected.name);
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
      const res = filter
        ? await axios.get(`http://localhost:8000/users?name=${filter}`)
        : await axios.get("http://localhost:8000/users");
      setData(res.data);
      setLoading(false);
      console.log("loading", isLoading);
    };
    fetchData();
  }, [filter]);
  // handle searchBar
  const onChange = (value) => {
    if (value === "") {
      setFilter(null);
      console.log("filter when input clear", filter);
    }
    setKeyword(value);
  };

  const suggestionSelected = (value) => {
    setKeyword(value);
    console.log("value when selected", value);
    setFilter(value);
  };
  const handlePressEnter = (value) => {
    console.log("handlePressEnter", value);
    setFilter(keyword);
    console.log("filter value when onSearch", filter);
  };
  return (
    <div className='p-[33px]'>
      <div className='flex justify-between mb-4'>
        <AntdButton
          className='antd-button'
          text='Add User'
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
      <AddEditUserModal
        destroyOnClose
        title={isEditting ? "Edit User" : "Add User"}
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

export default UsersPage;
