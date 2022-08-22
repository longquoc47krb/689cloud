import React from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

const PageTitle = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full h-full min-h-[100vh] bg-white p-5 relative'>
      <h1 className='title'>{t("title-of-search-page")}</h1>
      <Input style={{ width: 500 }} />
      <div className='absolute bottom-5 right-5 flex gap-x-2'>
        <button className='button bg-[#E2E2E2] text-[#73879C] '>
          {t("cancel")}
        </button>
        <button className='button bg-[#839C97] text-white'>SAVE</button>
      </div>
    </div>
  );
};

export default PageTitle;
