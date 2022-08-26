/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Modal, Row, Form, Input } from "antd";
import { FastField, FormikProvider, useFormik, ErrorMessage } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateUserForm } from "../../middlewares/validate";
import { resetModal } from "../../redux/slices/adminModalSlice";
import { AntdDatePicker, AntdInput } from "../AntdInput";
const AddEditUserModal = (props) => {
  const { title, selectedData, open } = props;
  const dispatch = useDispatch();
  const initialValues = {
    id: selectedData?.id ?? "",
    name: selectedData?.name ?? "",
    suspension: selectedData?.suspension ?? "",
    contractStart: moment(selectedData.contractStart) ?? moment(),
    contractEnd: moment(selectedData.contractEnd) ?? moment(),
    password: selectedData?.password ?? "",
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
  const { setValues } = formik;
  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);
  function handleChangeUpperCase(event) {
    const { value } = event.target;
    formik.setFieldValue("name", value);
    formik.setFieldValue("suspension", value.toUpperCase());
  }
  console.log("formik suspension", formik.values.suspension);
  console.log("formik name", formik.values.name);
  return (
    <Modal title={title} centered visible={open} onCancel={handleCancel}>
      <FormikProvider value={formik}>
        <Form>
          <Row gutter={[48, 40]} className='leading-8'>
            <Col span={12}>
              <FastField
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
              <FastField component={AntdInput} label='Param 01' name='param1' />
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
              <span className='dividing-line text-[18px] font-normal  text-text-color'>
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
