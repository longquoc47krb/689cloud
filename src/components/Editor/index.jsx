import { Editor } from "react-draft-wysiwyg";
import { EditorState, Modifier } from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import { Component } from "react";
export const TextEditor = () => (
  <Editor
    wrapperClassName='h-[200px]'
    editorClassName='border-gray-200 border pl-3'
    toolbarClassName='toolbar-class'
    toolbar={{
      inline: { inDropdown: false },
      list: { inDropdown: false },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
      options: [
        "inline",
        "fontSize",
        "fontFamily",
        "list",
        "textAlign",
        "link",
        "image",
        "history",
      ],
    }}
    toolbarCustomButtons={[
      <InsertMentionTag value='Fullname' />,
      <InsertMentionTag value='Password' />,
      <InsertMentionTag value='Username' />,
      <InsertMentionTag value='Company Name' />,
    ]}
    mention={{
      separator: " ",
      trigger: "@",
      suggestions: [
        { text: "Full Name", value: "Full Name" },
        { text: "Username", value: "Username" },
        { text: "Password", value: "Password" },
        { text: "Company Name", value: "Company Name" },
      ],
    }}
  />
);
const InsertMentionTag = (props) => {
  const { editorState, onChange, value } = props;
  const insert = () => {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      `@${value}`,
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };
  return (
    <button className='mx-2 ' onClick={insert}>
      {value}
    </button>
  );
};
