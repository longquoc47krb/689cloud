/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Modal, Row, Form, Input, Button } from "antd";
import {
  FastField,
  Field,
  FormikProvider,
  useFormik,
  ErrorMessage,
} from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { validateUserForm } from "../../middlewares/validate";
import {
  setDisabled,
  resetModal,
  handleSaveCancel,
} from "../../redux/slices/adminModalSlice";
import { AntdDatePicker, AntdInput, AntdInputGroup } from "../AntdInput";
const AddEditUserModal = (props) => {
  const { title, selectedData, open } = props;
  // const [email, setEmail] = useState("example@689cloud.com");
  const disabled = useSelector((state) => state.modal.disabled);
  const email = useSelector((state) => state.modal.selectedData.email);
  console.log("email", email);
  const [tempEmail, setTempEmail] = useState(email);
  const dispatch = useDispatch();
  const initialValues = {
    id: selectedData?.id ?? "",
    name: selectedData?.name ?? "",
    suspension: selectedData?.suspension ?? "",
    contractStart: moment(selectedData.contractStart) ?? moment(),
    contractEnd: moment(selectedData.contractEnd) ?? moment(),
    password: selectedData?.password ?? "",
    email: selectedData?.email ?? email,
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
  const { setValues, setFieldValue } = formik;
  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);
  function saveEmailInfo() {
    setFieldValue("email", formik.values.email);
    dispatch(handleSaveCancel({ email: formik.values.email }));
  }
  function cancelEmailInfo() {
    setTempEmail(email);
    dispatch(handleSaveCancel({ email: email }));
    setFieldValue("email", email);
  }
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
              <Field
                component={AntdInputGroup}
                label='Email'
                name='email'
                disabled={disabled}
                onCancelClick={cancelEmailInfo}
                onChangeClick={() => dispatch(setDisabled())}
                onSaveClick={saveEmailInfo}
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
