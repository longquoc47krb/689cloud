import React, { useEffect, useState, Fragment } from "react";
import { Table, Row, Col, Card, Empty, Button } from "antd";
import "antd/dist/antd.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

var temp;
const DraggableTable = ({ columns, dataSource }) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(dataSource);
  }, [dataSource]);
  console.log("tableData", tableData);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    const newTableData = Array.from(tableData);
    newTableData.splice(source.index, 1); // removing the item
    newTableData.splice(
      destination.index,
      0,
      tableData.find((data) => data.id === draggableId)
    ); // pushing in the new position
    temp = newTableData;
    setTableData(newTableData);
  };
  useEffect(() => {
    console.log("new table data", tableData);
  }, [tableData]);
  const customTableWrapper = (props) => (
    <Droppable droppableId='droppable'>
      {(provided) => (
        <Fragment>
          <tbody
            ref={provided.innerRef}
            {...props}
            {...provided.droppableProps}></tbody>
          <tfoot>{provided.placeholder}</tfoot>
        </Fragment>
      )}
    </Droppable>
  );

  const customTableRow = ({ index, record, ...restProps }) => {
    return (
      <Draggable key={record?.id} draggableId={record?.id} index={index}>
        {(provided) => (
          <tr
            key={record?.id}
            ref={provided.innerRef}
            {...restProps}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='row-item'
          />
        )}
      </Draggable>
    );
  };

  const components = {
    body: {
      // Custom tbody
      wrapper: customTableWrapper,
      // Custom row
      row: customTableRow,
    },
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Table
        dataSource={tableData}
        columns={columns}
        components={components}
        onRow={(record, index) => ({
          index,
          record,
        })}
        rowKey='id'
        pagination={true}
        size={10}
      />
    </DragDropContext>
  );
};

export default DraggableTable;
