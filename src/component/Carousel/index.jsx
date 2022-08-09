import React, { useState } from "react";
import "antd/dist/antd.css";
import { Carousel as AntdCarousel } from "antd";
import Item from "../Item";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
export default function Carousel(props) {
  const { data, className } = props;

  function onChange(a, b, c) {
    // console.log(a, b, c);
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
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  };
  const settings = {
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
