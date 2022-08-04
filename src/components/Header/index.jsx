/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import services from "../../assets/services.png";
import avatar from "../../assets/avatar.png";
const Header = (props) => {
  const { onShowAccountSettings } = props;
  return (
    <div className='bg-white flex justify-between items-center h-[60px] px-4'>
      <img src={services} />
      <img src={avatar} onClick={onShowAccountSettings} />
    </div>
  );
};

export default Header;
