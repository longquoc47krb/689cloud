import { Image, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { BsFillBookFill } from "react-icons/bs";
const DetailContent = (props) => {
  const { visible, onChangeTextArea, ...children } = props;
  const { photo, title, author, gen, publisher, group, genre } = children;
  return (
    <Modal
      visible={visible}
      footer={
        <div className='w-full'>
          <button className='font-bold text-lg text-white flex mx-auto items-center gap-x-2 rounded bg-[#F0AD4E] px-4 py-3'>
            <BsFillBookFill className='text-white' /> DISPLAY BOOK
          </button>
        </div>
      }>
      <div className='flex gap-x-6'>
        <Image className='w-[266px]' src={photo} />
        <div>
          <h1 className='title'>{title}</h1>
          <h1 className='title'>{author}</h1>
          <h1 className='title'>{gen}</h1>
          <h1 className='title'>{publisher}</h1>
          <h1 className='title'>{group}</h1>
          <h1 className='title'>{genre}</h1>
        </div>
      </div>
      <h1 className='title my-4'>Table of Contents</h1>
      <TextArea rows={6} allowClear onChange={onChangeTextArea} />
    </Modal>
  );
};

export default DetailContent;
