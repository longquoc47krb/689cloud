/* eslint-disable */
import { Col, Form, Modal, Row } from "antd";
import { FastField, Field, FormikProvider, useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { validateUserForm } from "../../middlewares/validate";
import { AntdDatePicker, AntdInput, AntdInputGroup } from "../AntdInput";
import { resetModal } from "../../redux/slices/adminModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setEditData } from "../../redux/slices/editDataSlice";

const AddEditUserModal = (props) => {
  const { title, selectedData, open } = props;
  // editDataSlice
  const tempData = useSelector((state) => state.edit.editData);
  const email = useSelector((state) => state.edit.editData.email);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setEditData({
        email: {
          temp: email.value,
          ...email,
        },
      })
    );
  }, []);
  const initialValues = {
    id: selectedData?.id ?? "",
    name: selectedData?.name ?? "",
    suspension: selectedData?.suspension ?? "",
    contractStart: moment(selectedData.contractStart) ?? moment(),
    contractEnd: moment(selectedData.contractEnd) ?? moment(),
    password: selectedData?.password ?? "",
    email: selectedData?.email ?? email.value,
  };
  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateUserForm,
    onSubmit: (values) => {},
  });
  const handleCancel = () => {
    dispatch(resetModal());
  };
  const { setValues, setFieldValue, values, errors } = formik;
  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);

  function onClickSave(key) {
    if (!errors[key]) {
      dispatch(
        setEditData({
          [key]: {
            temp: values[key],
            value: values[key],
            disabled: true,
          },
        })
      );
    }
  }
  function onClickCancel(key, obj) {
    const object = Object.assign({}, obj);
    dispatch(
      setEditData({
        [key]: {
          temp: object.value,
          ...object,
          disabled: true,
        },
      })
    );
    setFieldValue(key, obj.temp);
  }
  function onClickChange(key, obj) {
    const object = Object.assign({}, obj);
    dispatch(
      setEditData({
        [key]: {
          ...object,
          disabled: false,
        },
      })
    );
  }
  console.log({ email, ...tempData });
  return (
    <Modal
      title={title}
      centered
      visible={open}
      onCancel={handleCancel}
      width={1000}>
      <FormikProvider value={formik}>
        <Form>
          <Row gutter={[48, 40]} className='leading-8'>
            <Col span={12}>
              <Field
                name='name'
                component={AntdInput}
                label='Name'
                uppercase={true}
                // onChange={(value) => {
                //   formik.setFieldValue("suspension", value.toUpperCase());
                // }}
              />
              <FastField
                component={AntdDatePicker}
                label='Contract Start'
                name='contractStart'
              />
              <Field
                component={AntdInputGroup}
                label='Email'
                name='email'
                disabled={email.disabled}
                onClickCancel={() => onClickCancel("email", email)}
                onClickChange={() => onClickChange("email", email)}
                onClickSave={() => onClickSave("email")}
              />
              <FastField component={AntdInput} label='Param 03' name='param3' />
              <FastField component={AntdInput} label='Param 05' name='param5' />
            </Col>
            <Col span={12}>
              <FastField
                name='suspension'
                component={AntdInput}
                label='Suspension'
              />
              <FastField
                component={AntdDatePicker}
                label='Contract End'
                name='contractEnd'
              />
              <FastField component={AntdInput} label='Param 02' name='param2' />
              <FastField component={AntdInput} label='Param 04' name='param4' />
            </Col>
          </Row>
          <Row gutter={[48, 40]} className='leading-8'>
            <Col span={24}>
              <span className='title text-[18px] text-text-color'>
                Authentication (Optional)
              </span>
            </Col>
          </Row>
          <Row gutter={[48, 40]} className='leading-8'>
            <Col span={12}>
              <FastField component={AntdInput} label='ID' name='id' />
            </Col>
            <Col span={12}>
              <FastField
                component={AntdInput}
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
export default AddEditUserModal;
