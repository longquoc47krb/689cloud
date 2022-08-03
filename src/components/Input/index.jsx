import {
  Button,
  DatePicker as AntdDatePicker,
  Form,
  Input as AntdInput,
  Typography,
} from "antd";
import { ErrorMessage } from "formik";
import moment from "moment";
import React from "react";
const { label } = Typography;
const { Item } = Form;
function Input(props) {
  const { field, placeholder, label } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <label className='input-label'>{label}</label>
        <AntdInput
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        <p className='errors'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function InputGroup(props) {
  const { field, placeholder, label, onClick } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <label className='input-label'>{label}</label>
        <AntdInput.Group className='h-8'>
          <AntdInput
            style={{
              width: "calc(100% - 84px)",
              height: "100%",
            }}
          />
          <button className='bg-[#839C97] p-[5px 11px] h-full w-[84px] font-bold text-lg text-white'>
            Change
          </button>
        </AntdInput.Group>
        <p className='errors'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function InputPassword(props) {
  const { field, placeholder, label } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <label className='input-label'>{label}</label>
        <AntdInput.Group className='h-8 flex items-center'>
          <AntdInput.Password
            style={{
              width: "calc(100% - 84px)",
              height: "100%",
            }}
          />
          <button className='bg-[#839C97] p-[5px 11px] h-8 w-[84px] font-bold text-lg text-white'>
            Change
          </button>
        </AntdInput.Group>
        <p className='errors'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function DatePicker(props) {
  const dateFormat = "DD/MM/YYYY";
  const { field, placeholder, label } = props;
  const { value, onChange, onBlur, name } = field;
  return (
    <>
      <Item>
        <label className='input-label'>{label}</label>
        <AntdDatePicker
          className='w-full'
          format={dateFormat}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <p className='errors'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function InputSearchField(props) {
  const { label, value, onChange, name } = props;
  return (
    <>
      <div style={{ width: "auto", display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <label className='text-sm font-bold'>{label}</label>
        <AntdInput
          className='w-[400px]'
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
export { Input, InputGroup, InputPassword, DatePicker, InputSearchField };
