import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { EditorComponent } from "../../../components/Editor";
import EmailContent from "./EmailContent";

const EmailTab = () => {
  const [emailMode, setEmailMode] = useState("default");
  console.log("emailMode", emailMode);
  const handleSwitchEmailMode = (value) => {
    setEmailMode(value ? "default" : "customized-email");
  };
  return (
    <div className='w-full h-full min-h-[100vh] bg-white p-5 relative'>
      <h1 className='title' id='authentication-text'>
        Email Forgot Password
      </h1>
      <p className='text-base'>Use default template</p>
      <div className='my-5'>
        <Switch size='large' onChange={handleSwitchEmailMode} defaultChecked />
      </div>
      {emailMode === "default" ? "" : <EmailContent />}
    </div>
  );
};

export default EmailTab;
