/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { BsFillBookFill, BsFillInfoCircleFill } from "react-icons/bs";
const TileView = ({ photo, title, author, onDisplayBook, onShowDetails }) => {
  return (
    <div className='w-[133px] bg-white rounded p-[18px] mr-3 mb-3 mobile:w-auto'>
      <div className='w-full flex justify-center'>
        <img src={photo} className='flex justify-center w-[74px] h-[55px]' />
      </div>
      <div>
        <h1 className='text-wrap font-bold' style={{ display: "-webkit-box", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{title}</h1>
        <h1 className='text-wrap font-bold' style={{ display: "-webkit-box", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical" }}>{author}</h1>
      </div>
      <div className='flex gap-x-1'>
        <button className='view-button-tile w-full flex justify-center bg-[#72D498]' onClick={onShowDetails}>
          <BsFillInfoCircleFill className='text-white text-center ' />
        </button>
        <button className='view-button-tile w-full flex justify-center bg-[#F0AD4E]' onClick={onDisplayBook}>
          <BsFillBookFill className='text-white ' />
        </button>
      </div>
    </div>
  );
};

export default TileView;
