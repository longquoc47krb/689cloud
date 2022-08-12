import React from "react";
import { Input } from "antd";
import { EditorComponent } from "../../../components/Editor";

const EmailContent = () => {
  return (
    <div className='leading-10'>
      <h1>Japanes Email Subject</h1>
      <Input />
      <h1>Japanes Email Body</h1>
      <EditorComponent />
    </div>
  );
};

export default EmailContent;
