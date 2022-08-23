/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Card, Row } from "antd";
import { FastField, FormikProvider, useFormik, Form } from "formik";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateLoginForm } from "../middlewares/validate";
import { AntdInput } from "../component/AntdInput";
import {
  authSelector,
  login,
  loginStatusSelector,
  loginUser,
} from "../redux/slices/authSlice";
import LoadingButton from "../component/LoadingButton";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitch from "../component/LanguageSwitch";
import { useTranslation, withTranslation } from "react-i18next";
const Login = (props) => {
  const { selectedData, title } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginStatus = useSelector(loginStatusSelector);
  const authStates = useSelector(authSelector);
  const dispatch = useDispatch();
  const initialValues = {
    client_ip_address: "",
    company_domain: "",
  };
  // auto get IP address
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      console.log(res.data);
      formikLogin.setFieldValue("client_ip_address", res.data.IPv4);
    };
    getData();
  }, []);

  // formik
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      if (title === `${t("user-login")}`) {
        dispatch(loginUser(values));
      } else {
        dispatch(login(values));
      }
      navigate("/dashboard");
    },
  });
  // notification for login
  useMemo(() => {
    if (loginStatus) {
      toast.error(loginStatus?.message);
    } else {
      toast.error(t("logout-msg"));
    }
    toast.success(t("auto-detect-ip"));
  }, [loginStatus]);
  const { setValues, handleSubmit } = formikLogin;
  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);

  return (
    <>
      <div className='bg-gray-200 flex items-center justify-center w-full h-[100vh] relative'>
        <LanguageSwitch className='absolute top-10 right-20' />
        <Card style={{ width: 500 }}>
          <FormikProvider value={formikLogin}>
            <h1 className='title text-3xl flex justify-center'>{title}</h1>
            <Form onSubmit={handleSubmit}>
              <Row gutter={16} className='leading-8'>
                <Col span={24}>
                  <FastField
                    component={AntdInput}
                    label={t("client-ip")}
                    name='client_ip_address'
                  />
                </Col>
              </Row>
              <Row gutter={16} className='leading-8'>
                <Col span={24}>
                  <FastField
                    component={AntdInput}
                    label={t("company-domain")}
                    name='company_domain'
                  />
                </Col>
              </Row>
              <LoadingButton loading={authStates.loading} text={t("login")} />
              <span className='mt-4 text-base flex justify-center text-[#73879C] '>
                {t("switch-to")}
                {title === t("admin-login") ? (
                  <Link to='/login'>
                    <a className='mx-1'>{t("user-login")}</a>
                  </Link>
                ) : (
                  <Link to='/admin-login'>
                    <a className='mx-1'>{t("admin-login")}</a>
                  </Link>
                )}
              </span>
            </Form>
          </FormikProvider>
          <ToastContainer
            position='top-left'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Card>
      </div>
    </>
  );
};
export default withTranslation("translation")(Login);
