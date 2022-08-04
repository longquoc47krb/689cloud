import React from 'react'
import { Pagination as AntdPagination } from 'antd';
const Pagination = (props) => {
    const { total, currentPage, onChangePage, pageSize } = props;
    return (
        <div>
            {
                total ? <AntdPagination
                    defaultCurrent={currentPage}
                    pageSize={pageSize} total={total}
                    onChange={onChangePage} /> : null
            }
        </div>
    )
}

export default Pagination