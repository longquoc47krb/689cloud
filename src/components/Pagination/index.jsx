import React from 'react'
import { Pagination as AntdPagination } from 'antd';
const Pagination = (props) => {
    const { total, currentPage, onChangePage } = props;
    console.log('pagination props', props)
    return (
        <div>
            {
                total ? <AntdPagination
                    defaultCurrent={currentPage}
                    pageSize={8} total={total}
                    onChange={onChangePage} /> : null
            }
        </div>
    )
}

export default Pagination