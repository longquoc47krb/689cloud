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

// end drag n drop feature
const TabLayout = (props) => {
  const { title, open, selectedData, handleCancel } = props;
  const { t } = useTranslation();
  const [boards, setBoards] = useState({});
  // drag n drop feature

  const initialValues = {
    title: selectedData?.title ?? "",
    searchFields: selectedData.searchFields ?? [""],
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateTabLayout,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {},
  });
  const { setValues } = formik;
  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);
  const SearchBoxBoards = {
    first: constants.searchBoxItems,
    second: constants.searchBoxItems2,
  };
  useEffect(() => {
    setBoards(SearchBoxBoards);
  }, []);
  // drag and drop feature
  const onChangeMulti = (itemsMap) => {
    setBoards(itemsMap);
  };
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
          <div className='flex gap-x-[25rem]'>
            <h1 className='title'>{t("list-search-box")}</h1>
            <h1 className='title'>{t("selected-search-box")}</h1>
          </div>

          <div className='flex gap-x-2 justify-between items-center relative'>
            <IoMdSwap
              className='absolute text-6xl right-1/2 top-1/2'
              style={{ transform: "translateX(31px)" }}
            />
            <DragAndDrop itemsMap={boards} onChange={onChangeMulti} />
          </div>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default TabLayout;
