/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { BsFillBookFill, BsFillInfoCircleFill } from "react-icons/bs";
const ListView = ({ photo, title, author, description, ...props }) => {
  const { onShowDetails, onDisplayBook } = props;

  return (
    <div className='w-[752px] bg-white rounded p-[18px] flex gap-x-3 mb-3 mobile:w-[375px] tablet:w-[700px]'>
      <img className='w-[94px] h-[71px]' src={photo} />
      <div className='flex-1 w-[426px]'>
        <h1 className='text-wrap font-bold ' style={{ display: "-webkit-box", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{title}</h1>
        <h1 className='text-wrap font-bold ' style={{ display: "-webkit-box", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{author}</h1>
        <h1 className='text-wrap font-base' style={{ display: "-webkit-box", WebkitLineClamp: 3, lineClamp: 3, WebkitBoxOrient: "vertical" }}>{description}</h1>
      </div>
      <div className='flex flex-col gap-y-3'>
        <button className='laptop:view-button bg-[#72D498] mobile:view-button-mobile tablet:view-button-tablet ' onClick={onShowDetails}>
          <BsFillInfoCircleFill className='text-white ' />
          Show Details
        </button>
        <button className='laptop:view-button bg-[#F0AD4E] mobile:view-button-mobile tablet:view-button-tablet ' onClick={onDisplayBook}>
          <BsFillBookFill className='text-white' /> Display Book
        </button>
      </div>
    </div>
  );
};

export default ListView;
