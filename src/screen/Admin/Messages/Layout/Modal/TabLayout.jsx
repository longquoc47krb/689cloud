import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Form, Card } from "antd";
import { FastField, FormikProvider, useFormik } from "formik";
import { IoMdSwap } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { validateTabLayout } from "../../../../../middlewares/validate";
import constants from "../../../../../constants";
import { AntdInput } from "../../../../../component/AntdInput";
import { useTranslation } from "react-i18next";

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
    1: {
      items: constants.searchBoxItems,
    },
    2: {
      items: selectedData.searchFields ?? [],
    },
  };
  useEffect(() => {
    setBoards(SearchBoxBoards);
  }, [selectedData]);
  // drag and drop feature
  const onDragEnd = (result, boards, setBoards) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = boards[source.droppableId];
      const destColumn = boards[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setBoards({
        ...boards,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const board = boards[source.droppableId];
      const copiedItems = [...board.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setBoards({
        ...boards,
        [source.droppableId]: {
          ...board,
          items: copiedItems,
        },
      });
    }
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
          <div className='flex gap-x-2 justify-between items-center'>
            <DragDropContext
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
            </DragDropContext>
            <IoMdSwap className='order-1 text-6xl' />
          </div>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default TabLayout;
