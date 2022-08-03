import { Image, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { BsFillBookFill } from "react-icons/bs";
const DetailContent = (props) => {
  const { visible, handleCancel, onChangeTextArea, selectedItem } = props;
  // const { photo, title, author, gen, publisher, group, genre } = children;
  return (
    <Modal
      onCancel={handleCancel}
      visible={visible}
      footer={
        <div className='w-full'>
          <button className='font-bold text-lg text-white flex mx-auto items-center gap-x-2 rounded bg-[#F0AD4E] px-4 py-3'>
            <BsFillBookFill className='text-white' /> DISPLAY BOOK
          </button>
        </div>
      }>
      <div className='flex gap-x-6'>
        <Image className='w-[266px]' src={selectedItem?.photo} />
        <div>
          <h1 className='title'>{selectedItem?.title}</h1>
          <h1 className='title'>{selectedItem?.author}</h1>
          <h1 className='title'>{selectedItem?.gen}</h1>
          <h1 className='title'>{selectedItem?.publisher}</h1>
          <h1 className='title'>{selectedItem?.group}</h1>
          <h1 className='title'>{selectedItem?.genre}</h1>
        </div>
      </div>
      <h1 className='title my-4'>Table of Contents</h1>
      <TextArea
        rows={6}
        allowClear
        onChange={onChangeTextArea}
        style={{ border: "1px solid #B9B3B3" }}
      />
    </Modal>
  );
};

export default DetailContent;
