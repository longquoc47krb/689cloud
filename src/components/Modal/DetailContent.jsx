import { Image, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { BsFillBookFill } from "react-icons/bs";
const DetailContent = (props) => {
  const { visible, onCancel, onChangeTextArea, selectedItem } = props;
  // const { photo, title, author, gen, publisher, group, genre } = children;
  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      footer={
        <div className='w-full'>
          <button className='font-bold text-lg text-white flex mx-auto items-center gap-x-2 rounded bg-[#F0AD4E] px-4 py-3'>
            <BsFillBookFill className='text-white' /> DISPLAY BOOK
          </button>
        </div>
      }>
      <div className='flex gap-x-6'>
        <Image className='w-[266px] h-auto' src={selectedItem?.image} />
        <div>
          <h1 className='text-wrap font-semibold text-lg mb-2 border-b-[#d0d0d0] border-b-2' style={{ display: "-webkit-flex", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{selectedItem?.title}</h1>
          <h1 className='text-wrap font-semibold text-lg mb-2 border-b-[#d0d0d0] border-b-2' style={{ display: "-webkit-flex", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{selectedItem?.author}</h1>
          <h1 className='text-wrap font-semibold text-lg mb-2 border-b-[#d0d0d0] border-b-2' style={{ display: "-webkit-flex", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{selectedItem?.gen}</h1>
          <h1 className='text-wrap font-semibold text-lg mb-2 border-b-[#d0d0d0] border-b-2' style={{ display: "-webkit-flex", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{selectedItem?.publisher}</h1>
          <h1 className='text-wrap font-semibold text-lg mb-2 border-b-[#d0d0d0] border-b-2' style={{ display: "-webkit-flex", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{selectedItem?.group}</h1>
          <h1 className='text-wrap font-semibold text-lg mb-2 border-b-[#d0d0d0] border-b-2' style={{ display: "-webkit-flex", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{selectedItem?.genre}</h1>
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
