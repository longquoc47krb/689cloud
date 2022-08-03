/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { BsFillBookFill, BsFillInfoCircleFill } from "react-icons/bs";
const ListView = ({ photo, title, author, description, ...props }) => {
  const { onShowDetails, onDisplayBook } = props;
  return (
    <div className='w-[752px] bg-white rounded p-[18px] flex gap-x-3 mb-3'>
      <img className='w-[94px] h-[71px]' src={photo} />
      <div className='flex-1 w-[426px]'>
        <h1 className='text-sm font-bold'>{title}</h1>
        <h1 className='text-sm font-bold'>{author}</h1>
        <h1 className='text-sm font-thin'>{description}</h1>
      </div>
      <div className='flex flex-col gap-y-3'>
        <button className='view-button bg-[#72D498]' onClick={onShowDetails}>
          <BsFillInfoCircleFill className='text-white ' />
          Show Details
        </button>
        <button className='view-button bg-[#F0AD4E]' onClick={onDisplayBook}>
          <BsFillBookFill className='text-white' /> Display Book
        </button>
      </div>
    </div>
  );
};

export default ListView;
