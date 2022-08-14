/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal } from "antd";
import { FastField, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { IoMdSwap } from "react-icons/io";
import { AntdInput } from "../../../../components/AntdInput";
import { validateTabLayout } from "../../../../middlewares/validate";

// end drag n drop feature
const TabLayout = (props) => {
  const { title, open, selectedData, handleCancel } = props;
  console.log("selectedData", selectedData);
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
            label='Title'
            name='title'
            width={400}
          />
          <div className='flex gap-x-[25rem]'>
            <h1 className='title'>List search box</h1>
            <h1 className='title'>Selected search box</h1>
          </div>
          <div className='flex gap-x-2 justify-between items-center'>
            {/* <DragDropContext
              onDragEnd={(result) => onDragEnd(result, boards, setBoards)}>
              {Object.entries(boards).map(([columnId, board], index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      order: index + 1,
                    }}
                    key={columnId}>
                    <div style={{ margin: 8 }}>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 8,
                                width: 300,
                                minHeight: 500,
                              }}>
                              {board.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.key}
                                    draggableId={item.key}
                                    index={index}>
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className='title'
                                          style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#E2E2E2"
                                              : "#FFFFFF",

                                            ...provided.draggableProps.style,
                                          }}>
                                          {` ${item.value}`}
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                );
              })}
            </DragDropContext> */}
            <IoMdSwap className='order-1 text-6xl' />
          </div>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default TabLayout;
