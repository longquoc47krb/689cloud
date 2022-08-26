/* eslint-disable no-unused-vars */
import { Button, DatePicker, Form, Input, Select } from "antd";
import MaskedInput from "antd-mask-input";
import { ErrorMessage } from "formik";
import React from "react";
import { AiFillSave } from "react-icons/ai";
import { ImCross } from "react-icons/im";
const { Item } = Form;
const { Option } = Select;
function AntdInput(props) {
  const {
    field,
    label,
    width,
    uppercase,
    onChange: onChangeCustom,
    disabled,
  } = props;
  const { value, onChange, onBlur, name } = field;
  const handleChange = (e) => {
    const { value } = e.target;
    var customEvent = {
      target: {
        value: uppercase ? value.toUpperCase() : value,
        name,
      },
    };
    onChange(customEvent);
    if (onChangeCustom) {
      onChangeCustom(value);
    }
  };
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <Input
          disabled={disabled}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={handleChange}
          style={{ width: width }}
        />
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function AntdInputGroup(props) {
  const {
    field,
    label,
    uppercase,
    onChange: onChangeCustom,
    disabled,
    onSaveClick,
    onCancelClick,
    onChangeClick,
  } = props;
  console.log("disabled", disabled);
  const { value, onChange, onBlur, name } = field;
  const handleChange = (e) => {
    const { value } = e.target;
    var customEvent = {
      target: {
        value: uppercase ? value.toUpperCase() : value,
        name,
      },
    };
    onChange(customEvent);
    if (onChangeCustom) {
      onChangeCustom(value);
    }
  };
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <Input.Group>
          <Input
            disabled={disabled}
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={handleChange}
            style={
              !disabled
                ? { width: "calc(100% - 140px" }
                : { width: "calc(100% - 70px)" }
            }
          />
          {!disabled ? (
            <div className='flex'>
              <Button
                danger
                type='primary'
                style={{
                  width: 70,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                }}
                onClick={onCancelClick}>
                <ImCross />
                Cancel
              </Button>
              <Button
                type='primary'
                style={{
                  width: 70,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                }}
                onClick={onSaveClick}>
                <AiFillSave />
                Save
              </Button>
            </div>
          ) : (
            <>
              <Button
                type='primary'
                style={{ width: 70, textAlign: "center" }}
                onClick={onChangeClick}>
                Change
              </Button>
            </>
          )}
        </Input.Group>
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
  const { form, field, label } = props;
  const { value, onBlur, name } = field;
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <DatePicker
          className='w-full'
          format={dateFormat}
          name={name}
          value={value}
          onChange={(value) => form.setFieldValue(name, value)}
          onBlur={onBlur}
        />
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
const DUMB_IP_MASK = "0[0][0].0[0][0].0[0][0].0[0][0]";
function AntdInputIP(props) {
  const { field, label, value } = props;
  const { name, onBlur, onChange } = field;
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <MaskedInput
          mask={DUMB_IP_MASK}
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
function AntdInputNumber(props) {
  const { field, label, value } = props;
  const { name, onBlur, onChange } = field;
  const onKeyDown = (event) => {
    const characterCode = event.key;
    if (characterCode === "Backspace" || characterCode === "Delete") return;
    const characterNumber = Number(characterCode);
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (event.currentTarget.value && event.currentTarget.value.length) {
        return;
      } else if (characterNumber === 0) {
        event.preventDefault(); // if you dont want zero at first
        // return; // if you wanna zero at first
      }
    } else {
      event.preventDefault();
    }
  };
  return (
    <>
      <Item>
        <h1 className='title'>{label}</h1>
        <Input
          name={name}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={onBlur}
          style={{ width: "100%" }}
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
  const { value, name, onChange } = field;
  const handleChange = (value) => {
    const customEvent = {
      target: {
        name: name,
        value: value,
      },
    };
    onChange(customEvent);
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
export {
  AntdInput,
  AntdInputPassword,
  AntdDatePicker,
  AntdSelect,
  AntdInputIP,
  AntdInputNumber,
  AntdInputGroup,
};
