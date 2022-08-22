import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { CircleFlag } from "react-circle-flags";
import Item from "antd/lib/list/Item";
function LanguageSwitch(props) {
  const { className } = props;
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang"));
  const { Option } = Select;
  const languageOptions = [
    {
      value: "en",
      countryCode: "gb",
      translation: "translation.EN",
    },
    {
      value: "vn",
      countryCode: "vn",
      translation: "translation.VN",
    },
    {
      value: "jp",
      countryCode: "jp",
      translation: "translation.JP",
    },
  ];
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };
  function getLang(language) {
    language = localStorage.getItem("lang");
    switch (lang) {
      case "EN":
        return "EN";
      case "VN":
        return "VN";
      case "JP":
        return "JP";
      default:
        return "EN";
    }
  }
  function titleByLanguage(language) {
    language = localStorage.getItem("lang");
    switch (lang) {
      case "EN":
        return t("translation.EN");
      case "VN":
        return t("translation.VN");
      case "JP":
        return t("translation.JP");
      default:
        return t("translation.EN");
    }
  }
  return (
    <div className={className}>
      <Select
        defaultValue={i18n.language}
        onChange={changeLanguage}
        style={{
          width: "auto",
          zIndex: "9",
          backgroundColor: "transparent",
          bordered: false,
        }}
        value={i18n.language}
        title={titleByLanguage}>
        {languageOptions.map((lang, index) => (
          <Option key={index} value={lang.value} style={{ padding: 3 }}>
            <CircleFlag
              countryCode={lang.countryCode}
              height={20}
              width={20}
              style={{
                display: "flex",
                alignItems: "center",
              }}
              title={t(`${lang.translation}`)}
            />
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default LanguageSwitch;
