import { Skeleton, Table } from "antd";
import React from "react";
export const AntdTable = (props) => {
  const { columns, isLoading, data, recordsPerPage, className } = props;
  return (
    <div className={className}>
      <Skeleton active loading={isLoading}>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: recordsPerPage }}
        />
      </Skeleton>
    </div>
  );
};
