import { Skeleton, Table } from "antd";
import React from "react";
export const AntdTable = (props) => {
  const { columns, isLoading, data, recordsPerPage } = props;
  return (
    <>
      <Skeleton active loading={isLoading}>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: recordsPerPage }}
        />
      </Skeleton>
    </>
  );
};
