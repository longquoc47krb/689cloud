/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Modal, Row } from "antd";
import { FastField, FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { ImCross } from "react-icons/im";
import { validateSearchBox } from "../../../../../middlewares/validate";
import constants from "../../../../../constants";
import { AntdInput, AntdSelect } from "../../../../../component/AntdInput";

const SearchBoxModal = (props) => {
  const { title, open, selectedData, handleCancel } = props;
  const initialValues = {
    searchFields: selectedData?.searchFields ?? [],
    label: selectedData?.label ?? "",
    operation: selectedData?.operation ?? "",
    matchValues: selectedData?.matchValues ?? [{ key: "", value: "" }],
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSearchBox,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {},
  });
  const { setValues } = formik;

  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);
  return (
    <Modal
      title={title}
      centered
      visible={open}
      onCancel={handleCancel}
      width={800}>
      <FormikProvider value={formik}>
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <FastField
                component={AntdSelect}
                mode='multiple'
                label='Search Field'
                name='searchFields'
                options={Object.values(constants.searchFields).map((field) => ({
                  key: field.key,
                  value: field.value,
                }))}
              />
            </Col>
            <Col span={12}>
              <FastField component={AntdInput} label='Label' name='label' />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FastField
                component={AntdSelect}
                label='Operation'
                name='operation'
                options={Object.values(constants.operation).map((field) => ({
                  key: field.key,
                  value: field.value,
                }))}
              />
            </Col>
          </Row>
          <FieldArray name='matchValues'>
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { matchValues } = values;

              return (
                <>
                  <Row gutter={16}>
                    <button
                      className='button bg-[#839C97] text-white px-3'
                      onClick={() =>
                        push({
                          key: "",
                          name: "",
                        })
                      }>
                      ADD MATCH VALUE
                    </button>
                  </Row>
                  {values.matchValues?.map((_, index) => (
                    <Row gutter={16} className='flex items-center'>
                      <Col span={10}>
                        <FastField
                          name={`matchValues[${index}].key`}
                          component={AntdInput}
                          label={`Key ${index + 1}`}
                        />
                      </Col>
                      <Col span={10}>
                        <FastField
                          name={`matchValues[${index}].value`}
                          component={AntdInput}
                          label={`Match Value ${index + 1}`}
                        />
                      </Col>
                      <Col span={1}>
                        {index > 0 && (
                          <button type='button' onClick={() => remove(index)}>
                            <ImCross className='text-red-600' />
                          </button>
                        )}
                      </Col>
                    </Row>
                  ))}
                </>
              );
            }}
          </FieldArray>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default SearchBoxModal;
