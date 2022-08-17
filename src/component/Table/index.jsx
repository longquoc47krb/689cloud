import { Skeleton, Table as AntdTable } from "antd";
import React from "react";
export const Table = (props) => {
  const { columns, loading, data, recordsPerPage, className } = props;
  return (
    <div className={className}>
      <Skeleton active loading={loading}>
        <AntdTable
          rowKey='id'
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: recordsPerPage }}
        />
      </Skeleton>
    </div>
  );
};
