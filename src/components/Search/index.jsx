import React from 'react'
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
const Search = (props) => {
    const {
        dataSource,
        notFoundContent,
        keyword,
        onChange,
        onSelect,
        onPressEnter,
    } = props;
    return (
        <AutoComplete
            allowClear
            value={keyword}
            className="laptop:w-[50vw] tablet:w-[85vw] mobile:w-[80vw]"
            notFoundContent={notFoundContent}
            dropdownClassName='certain-category-search-dropdown'
            dropdownMatchSelectWidth={300}
            onSelect={onSelect}
            onChange={onChange}
            options={dataSource}
            filterOption={(inputValue, option) =>
                option.title.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }>
            <Input
                onPressEnter={onPressEnter}
                placeholder="Search by title"
                prefix={
                    <SearchOutlined onClick={onSelect} style={{ cursor: "pointer", color: "black" }} />
                }
            />
        </AutoComplete>
    )
}

export default Search