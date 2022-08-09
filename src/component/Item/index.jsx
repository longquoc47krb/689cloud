import { Tag } from "antd";
import React, { useState } from "react";
import { DESCRIPTION, GOOGLE_SEARCH_BY_IMAGE } from "../../constants";

const Item = ({ imageSrc, topic, className }) => {
  const handleClickTag = (value) => {
    console.log("value", value);
    window.open(GOOGLE_SEARCH_BY_IMAGE(value));
  };
  const [selectedId, setSelectedId] = useState(null);
  const topicArr = topic.split(",");
  const selectedTag = topicArr[selectedId];
  handleClickTag(selectedTag);
  return (
    <div className={className}>
      <div className='w-[400px] h-[600px] bg-gray-400 rounded-lg overlay'>
        <img
          className='w-full h-full rounded-lg object-cover image '
          src={imageSrc}
        />
        <div className='absolute bottom-5 p-2'>
          {topicArr.map((item, index) => (
            <Tag
              className='cursor-pointer'
              style={{ fontSize: "14px" }}
              key={index}
              tag={item}
              onClick={() => setSelectedId(index)}>
              {item}
            </Tag>
          ))}
          <p className='paragraph text-white'>{DESCRIPTION}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
