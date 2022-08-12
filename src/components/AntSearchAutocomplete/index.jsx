import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import React from "react";
function AntdSearchAutocomplete(props) {
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
      notFoundContent={notFoundContent}
      dropdownClassName='certain-category-search-dropdown'
      dropdownMatchSelectWidth={300}
      style={{
        width: 250,
      }}
      onSelect={onSelect}
      onChange={onChange}
      options={dataSource}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }>
      <Input
        onPressEnter={onPressEnter}
        prefix={
          <SearchOutlined onClick={onSelect} style={{ cursor: "pointer" }} />
        }
      />
    </AutoComplete>
  );
}

export default AntdSearchAutocomplete;
