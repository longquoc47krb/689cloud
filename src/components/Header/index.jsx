/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import services from "../../assets/services.png";
import avatar from "../../assets/avatar.png";
const Header = () => {
  return (
    <div className='bg-white flex justify-between items-center h-[60px] px-4'>
      <img src={services} />
      <img src={avatar} />
    </div>
  );
};

export default Header;
