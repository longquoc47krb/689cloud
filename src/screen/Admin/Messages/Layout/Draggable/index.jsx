/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  decrease,
  increase,
  setSelectedSearchBoxItems,
} from "../../../../../redux/slices/searchBoxSlice";

export function DragAndDrop({ items }) {
  // const [searchFields, setSearchBoxItems] = useState(items.second);
  const [originItems, setOriginItems] = useState(items.first);
  const [selectedId, setSelectedId] = useState({});
  const searchFields = useSelector(
    (state) => state.searchBox.selectedSearchBoxItems
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedSearchBoxItems(items.second));
  }, []);
  function onDragEnd(result) {
    if (
      result.source.droppableId === "second-droppable" &&
      result.destination.droppableId === "first-droppable"
    ) {
      const selectedSearchBoxList = Array.from(searchFields);
      const originItemsList = Array.from(originItems); // des
      const [reorderedItem] = selectedSearchBoxList.splice(
        result.source.index,
        1
      ); // bo 1 item tai vi tri index
      originItemsList.splice(result.destination.index, 0, reorderedItem); // them 1 item
      dispatch(setSelectedSearchBoxItems(selectedSearchBoxList)); // update cai bi bo
      setOriginItems(originItemsList); // updapte new item
      return;
    }
    if (
      result.source.droppableId === "first-droppable" &&
      result.destination.droppableId === "second-droppable"
    ) {
      const selectedSearchBoxList = Array.from(originItems);
      const originItemsList = Array.from(searchFields);
      const [reorderedItem] = selectedSearchBoxList.splice(
        result.source.index,
        1
      );
      originItemsList.splice(result.destination.index, 0, reorderedItem); // them item second-droppable
      dispatch(setSelectedSearchBoxItems(originItemsList));
      setOriginItems(selectedSearchBoxList);
      return;
    }
    if (result.destination.droppableId === "second-droppable") {
      const originItemsList = Array.from(searchFields);
      const [reorderedItem] = originItemsList.splice(result.source.index, 1); //At position x, remove 1 items:
      originItemsList.splice(result.destination.index, 0, reorderedItem);
      dispatch(setSelectedSearchBoxItems(originItemsList));
    } else {
      const originItemsList = Array.from(originItems);
      const [reorderedItem] = originItemsList.splice(result.source.index, 1); //At position x, remove 1 items:
      originItemsList.splice(result.destination.index, 0, reorderedItem);

      setOriginItems(originItemsList);
    }
  }
  const handleChoose = (key) => {
    setSelectedId(key);
  };

  /*  Remove search box item */
  // useEffect(() => {
  //   // const result = searchFields.filter((data) => data.key !== null);
  //   // setSearchBoxItems(result);
  //   setCheckNull(false);
  // }, [checkNull]);

  return (
    <div className='flex justify-between gap-x-10 w-full'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='first-droppable'>
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              style={{
                background: droppableSnapshot.isDraggingOver
                  ? "lightblue"
                  : "lightgrey",
                padding: 8,
                width: 350,
                minHeight: 500,
              }}
              className='d-flex bg-light p-2'>
              {originItems.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className='title'
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: draggableSnapshot.isDragging
                          ? "#E2E2E2"
                          : "#FFFFFF",

                        ...draggableProvided.draggableProps.style,
                      }}>
                      {` ${item.content}`}
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='second-droppable'>
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              style={{
                background: droppableSnapshot.isDraggingOver
                  ? "lightblue"
                  : "lightgrey",
                padding: 8,
                width: 350,
                minHeight: 500,
              }}
              className='d-flex bg-light p-2'>
              {searchFields?.map((item, index) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className='title'
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: draggableSnapshot.isDragging
                          ? "#E2E2E2"
                          : "#FFFFFF",

                        ...draggableProvided.draggableProps.style,
                      }}>
                      <div
                        className='flex items-center gap-x-3 justify-between'
                        onClick={() => handleChoose(item.key)}>
                        {` ${index + 1}. ${item.content}`}
                        {item.value >= 0 ? (
                          <div className='flex items-center gap-x-2'>
                            <AiOutlineMinus
                              className='cursor-pointer'
                              onClick={() => dispatch(decrease(item.key))}
                            />{" "}
                            {item.value}
                            <AiOutlinePlus
                              className='cursor-pointer'
                              onClick={() => dispatch(increase(item.key))}
                            />
                          </div>
                        ) : (
                          <div className='flex items-center'>
                            <AiOutlineMinus
                              className='cursor-pointer'
                              onClick={() => dispatch(decrease(item.key))}
                            />
                            {item.value}
                            <AiOutlinePlus
                              className='cursor-pointer'
                              onClick={() => dispatch(increase(item.key))}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
