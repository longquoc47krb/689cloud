import React from 'react'
import { Select as AntdSelect } from 'antd';
const { Option } = AntdSelect;
const Select = (props) => {
    const { placeholder, dataSource, onChange } = props;
    return (
        <AntdSelect
            showSearch
            allowClear
            className='w-[150px] mobile:w-full tablet:w-[20vw] laptop:w-[10vw]'
            optionFilterProp="children"
            placeholder={placeholder}
            onChange={onChange}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
            {dataSource.map((value, index) => (
                <Option key={index} value={value}>{value}</Option>
            )
            )}
        </AntdSelect>
    )
}

export default Select;