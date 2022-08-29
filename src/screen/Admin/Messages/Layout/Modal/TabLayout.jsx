/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal } from "antd";
import { FastField, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdSwap } from "react-icons/io";
import { AntdInput } from "../../../../../component/AntdInput";
import constants from "../../../../../constants";
import { validateTabLayout } from "../../../../../middlewares/validate";
import { DragAndDrop } from "../Draggable";
import { useSelector } from "react-redux";
import { searchFieldsSelector } from "../../../../../redux/slices/searchBoxSlice";
// end drag n drop feature
const TabLayout = (props) => {
  const { title, open, handleCancel } = props;
  const { t } = useTranslation();
  const [boards, setBoards] = useState({});
  const searchFields = useSelector(searchFieldsSelector);
  // drag n drop feature

  const initialValues = {
    title: "",
    searchFields: searchFields,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateTabLayout,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {},
  });
  const { setFieldValue } = formik;
  useEffect(() => {
    setFieldValue("searchFields", searchFields);
  }, [searchFields]);
  const SearchBoxBoards = {
    first: constants.searchBoxItems,
    second: [],
  };
  useEffect(() => {
    setBoards(SearchBoxBoards);
  }, []);
  // drag and drop feature
  return (
    <Modal
      title={title}
      centered
      visible={open}
      onCancel={handleCancel}
      style={{ paddingLeft: 10 }}
      width={886}>
      <FormikProvider value={formik}>
        <Form>
          <FastField
            className='pl-2'
            component={AntdInput}
            label={t("title")}
            name='title'
            width={400}
          />
          <div className='flex justify-between'>
            <h1 className='title'>{t("list-search-box")}</h1>
            <div className='justify-between flex w-[300px] -translate-x-6'>
              <h1 className='title'>{t("selected-search-box")}</h1>
              <h1 className='title'>{t("size")}</h1>
            </div>
          </div>

          <div className='flex gap-x-2 justify-between items-center relative'>
            <IoMdSwap
              className='absolute text-6xl right-1/2 top-1/2'
              style={{ transform: "translateX(31px)" }}
            />
            <DragAndDrop items={boards} />
          </div>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default TabLayout;
