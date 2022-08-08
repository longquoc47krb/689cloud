import React, { useState } from "react";
import "antd/dist/antd.css";
import { Carousel as AntdCarousel } from "antd";
import Item from "../Item";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
export default function Carousel(props) {
  const { data, className } = props;

  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          color: "white",
          fontSize: "4rem",
          lineHeight: "1.5715",
        }}
        onClick={onClick}>
        <RightOutlined />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          color: "white",
          fontSize: "4rem",
          lineHeight: "1.5715",
        }}
        onClick={onClick}>
        <LeftOutlined />
      </div>
    );
  };
  const settings = {
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className={className}>
      <AntdCarousel
        draggable
        afterChange={onChange}
        arrows
        {...settings}
        color={"black"}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {data?.map((card, i) => (
          <Item
            className='flex justify-center'
            key={i}
            topic={card.tags}
            imageSrc={card.largeImageURL}
          />
        ))}
      </AntdCarousel>
    </div>
  );
}
