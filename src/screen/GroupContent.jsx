import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupContent,
  getSelectedGroupContent,
  groupListSelector,
  groupSelector,
  selectedGroupSelector,
} from "../redux/slices/groupSlice";
import { TbEdit, TbTrash } from "react-icons/tb";
import { Modal } from "antd";
import GroupDetails from "./GroupDetails";
import { userInfoSelector } from "../redux/slices/userSlice";
import { userSelector } from "../redux/slices/authSlice";
import Table from "../component/Table";
import { useTranslation } from "react-i18next";
function GroupContent() {
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const groupList = useSelector(groupListSelector);
  const userInfo = useSelector(userInfoSelector);
  const groupAllState = useSelector(groupSelector);
  const user = useSelector(userSelector);
  const { t } = useTranslation();
  const selectedGroup = useSelector(selectedGroupSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupContent({ domain: user.domain }));
  }, [dispatch, user.domain]);

  const columns = [
    {
      title: <h1>ID</h1>,
      dataIndex: "id",
      width: "5%",
      render: (id) => <h3>{id}</h3>,
    },
    {
      title: <h1>{t("name")}</h1>,
      dataIndex: "name",
      align: "center",
      render: (name) => <h3>{name}</h3>,
    },
    {
      title: <h1>{t("number-of-contents")}</h1>,
      dataIndex: "number_of_contents_to_display",
      align: "center",
      width: "30%",
      render: (number_of_contents_to_display) => (
        <h3>{number_of_contents_to_display}</h3>
      ),
    },
    {
      title: <h1>{t("action")}</h1>,
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
      `${t("delete-msg")} `,
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
    setSelectedGroupName(record.name);
    dispatch(
      getSelectedGroupContent({
        id: record.id,
        domain: userInfo.domain,
      })
    );
  };

  return (
    <div>
      <p className='title'>{t("group-content")}</p>
      <Table
        columns={columns}
        data={groupList}
        loading={groupList ? false : true}
        recordsPerPage={7}
      />
      <GroupDetails
        title={selectedGroupName}
        open={groupAllState.toggle}
        data={selectedGroup}
        loading={selectedGroup ? false : true}
      />
    </div>
  );
}

export default GroupContent;
