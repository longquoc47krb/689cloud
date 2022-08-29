import { Skeleton, Table as AntdTable } from "antd";
import React from "react";
const Table = (props) => {
  const { id, columns, loading, data, recordsPerPage, className } = props;
  return (
    <div className={className}>
      <Skeleton active loading={loading}>
        <AntdTable
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: recordsPerPage }}
        />
      </Skeleton>
    </div>
  );
};
export default Table;
