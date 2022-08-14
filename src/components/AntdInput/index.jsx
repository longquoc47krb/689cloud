import { DatePicker, Form, Input, Select } from "antd";
import { ErrorMessage } from "formik";
import React from "react";
const { Item } = Form;
const { Option } = Select;
function AntdInput(props) {
  const { field, label, width } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <Input
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          style={{ width: width }}
        />
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function AntdInputPassword(props) {
  const { field, label } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <Input.Password
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function AntdDatePicker(props) {
  const dateFormat = "DD/MM/YYYY";
  const { field, label } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <DatePicker
          className='w-full'
          format={dateFormat}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function AntdSelect(props) {
  const { field, label, mode, options, width } = props;
  const { value, name } = field;
  const handleChange = (value) => {
    const changeEvent = {
      target: {
        name: name,
        value: value,
      },
    };
    field.onChange(changeEvent);
  };
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <Select
          value={value}
          onChange={handleChange}
          style={{ width: width }}
          mode={mode}>
          {options.map((item, index) => (
            <Option key={index + 1} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
export { AntdInput, AntdInputPassword, AntdDatePicker, AntdSelect };
