/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Modal, Radio, Row, Typography } from "antd";
import { FastField, FieldArray, FormikProvider, useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TrashIcon from "../../assets/TrashIcon";
import { validateUserGroupForm } from "../../middlewares/validate";
import { resetModal } from "../../redux/slices/adminModalSlice";
import {
  AntdDatePicker,
  AntdInput,
  AntdInputNumber,
  AntdInputPassword,
} from "../AntdInput";
import AntdButton from "../Button";

const { Text } = Typography;
const { Group } = Radio;
function AddEditUserGroupModal(props) {
  const { title, open, selectedData } = props;
  const dispatch = useDispatch();
  const initialValues = {
    name: selectedData.name ?? "",
    maxUser: selectedData.maxUser ?? "",
    staffId: moment(selectedData?.staffId) ?? moment(),
    session: selectedData.session ?? "",
    id: selectedData.id ?? "",
    password: selectedData.password ?? "",
    IPAddresses: selectedData.IPAddresses ?? [],
    authenticatedBy: selectedData.authenticatedBy ?? "id/password",
  };
  const onChangeAuthenticationMode = (e) => {
    setFieldValue("authenticatedBy", e.target.value);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateUserGroupForm,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {},
  });
  const { values, setFieldValue, setValues, handleChange } = formik;
  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);
  return (
    <Modal
      title={title}
      centered
      visible={open}
      onCancel={() => dispatch(resetModal())}>
      <FormikProvider value={formik}>
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <FastField component={AntdInput} label='Name' name='name' />
            </Col>
            <Col span={12}>
              <FastField
                component={AntdInputNumber}
                label='Session'
                name='session'
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FastField
                component={AntdDatePicker}
                label='Staff ID'
                name='staffId'
              />
            </Col>
          </Row>
          <Text strong id='authentication-text'>
            Authentication by
          </Text>
          <Row gutter={16}>
            <Col span={24}>
              <Group
                onChange={onChangeAuthenticationMode}
                value={values.authenticatedBy}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "0.5rem",
                }}>
                <Radio value='id/password'>
                  <Text strong>ID/Password</Text>
                </Radio>
                <Radio value='ip'>
                  <Text strong>IP address</Text>
                </Radio>
              </Group>
            </Col>
          </Row>
          {values.authenticatedBy === "id/password" ? (
            <Row gutter={16}>
              <Col span={12}>
                <FastField component={AntdInput} label='ID' name='id' />
              </Col>
              <Col span={12}>
                <FastField
                  component={AntdInputPassword}
                  label='Password'
                  name='password'
                />
              </Col>
            </Row>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>IP Address</Text>
                </Col>
                <Col span={12}></Col>
              </Row>
              <Row gutter={[24, 16]}>
                <FieldArray
                  name='IPAddresses'
                  render={({ push, remove, insert }) => (
                    <>
                      {values.IPAddresses.map((IPAddress, index) => (
                        <>
                          <Col span={12}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              key={index}>
                              <div>
                                <FastField
                                  component={AntdInput}
                                  name={`IPAddresses.${index}`}
                                />
                              </div>
                              <button
                                style={{
                                  position: "absolute",
                                  right: "1.5rem",
                                  top: 0,
                                  color: "red",
                                }}
                                onClick={() => {
                                  remove(index);
                                }}>
                                <TrashIcon />
                              </button>
                            </div>
                          </Col>
                        </>
                      ))}
                      <Col>
                        <AntdButton
                          text='Add'
                          onClick={() => {
                            push("");
                          }}
                        />
                      </Col>
                    </>
                  )}
                />
              </Row>
            </>
          )}
        </Form>
      </FormikProvider>
    </Modal>
  );
}

export default AddEditUserGroupModal;
