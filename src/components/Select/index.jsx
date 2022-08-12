import { Select, Typography } from "antd";
import React from "react";
const { Option } = Select;
function AntdSelect(props) {
  const { values, onChange } = props;
  return (
    <div className='flex items-center gap-x-1'>
      <Typography>Show</Typography>
      <Select
        defaultValue='5'
        style={{
          width: "auto",
        }}
        onChange={onChange}>
        {values.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.text}
          </Option>
        ))}
      </Select>
      <Typography>records</Typography>
    </div>
  );
}

export default AntdSelect;
