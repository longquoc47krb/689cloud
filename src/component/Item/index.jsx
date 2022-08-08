import { Tag } from "antd";
import React from "react";

const Item = ({ imageSrc, topic, className }) => {
  return (
    <div className={className}>
      <div className='w-[400px] h-[600px] bg-gray-400 rounded-lg overlay'>
        <img
          className='w-full h-full rounded-lg object-cover image '
          src={imageSrc}
        />
        <div className='absolute bottom-5 p-2'>
          {topic.map((item, index) => (
            <Tag style={{ fontSize: "14px" }} key={index} tag={item}>
              {item}
            </Tag>
          ))}
          <p className='paragraph text-white'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
