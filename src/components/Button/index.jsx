import Button from "antd-button-color";
import "antd-button-color/dist/css/style.css";
import "antd/dist/antd.css";
import React from "react";
const AntdButton = (props) => {
  const { type, text, onClick, icon, disabled } = props;
  return (
    <Button
      icon={icon}
      type={type || "primary"}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </Button>
  );
};

export default AntdButton;
