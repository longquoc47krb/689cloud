import React from "react";
import { Input } from "antd";
import { TextEditor } from "../../../components/Editor";

const EmailContent = () => {
  return (
    <div className='leading-10'>
      <h1>Japanes Email Subject</h1>
      <Input />
      <h1>Japanes Email Body</h1>
      <TextEditor />
    </div>
  );
};

export default EmailContent;
