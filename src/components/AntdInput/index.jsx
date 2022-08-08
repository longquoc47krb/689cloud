import { DatePicker, Form, Input, Typography } from "antd";
import { ErrorMessage } from "formik";
import moment from "moment";
import React from "react";
const { Text } = Typography;
const { Item } = Form;
function AntdInput(props) {
  const { field, placeholder, label } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <Text strong>{label}</Text>
        <Input name={name} value={value} onBlur={onBlur} onChange={onChange} />
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function AntdInputPassword(props) {
  const { field, placeholder, label } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <Text strong>{label}</Text>
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
  const { field, placeholder, label } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <Text strong>{label}</Text>
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

export { AntdInput, AntdInputPassword, AntdDatePicker };
