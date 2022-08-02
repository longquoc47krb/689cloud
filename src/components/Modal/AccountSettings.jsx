import React from "react";
import { Col, Form, Modal, Row } from "antd";
import { FastField, FormikProvider, useFormik } from "formik";
import { Input, InputGroup, InputPassword } from "../Input";
import { validateAccountSettings } from "../../middlewares/validates";
const AccountSettings = (props) => {
  const { visible } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateAccountSettings,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {},
  });
  return (
    <Modal
      title={
        <div className='bg-[#83889C] w-full py-2'>
          <span className='text-2xl font-bold text-white'>
            Account Settings
          </span>
        </div>
      }
      closable={false}
      visible={visible}
      width={1000}
      footer={
        <div className='w-full flex justify-end gap-x-5'>
          <button className='button text-[#73879C] border-[#73879C] border-solid border-t-2 border-r-2 border-b-2 border-l-2'>
            CANCEL
          </button>
          <button className='button text-white bg-[#73879C] border-[#73879C] border-solid border-t-2 border-r-2 border-b-2 border-l-2'>
            SAVE
          </button>
        </div>
      }>
      <h1 id='authentication-text' className='text-[#73879C] font-bold text-xl'>
        User Profile
      </h1>
      <FormikProvider value={formik}>
        <Form>
          <Row gutter={40}>
            <Col span={12}>
              <FastField
                component={Input}
                label='First Name'
                name='firstName'
              />
            </Col>
            <Col span={12}>
              <FastField component={Input} label='Last Name' name='lastName' />
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={12}>
              <FastField component={InputGroup} label='Email' name='email' />
            </Col>
            <Col span={12}>
              <FastField
                component={InputPassword}
                label='Password'
                name='password'
              />
            </Col>
          </Row>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AccountSettings;
