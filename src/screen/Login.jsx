/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Card, Row } from "antd";
import { FastField, FormikProvider, useFormik, Form } from "formik";
import React, { useEffect } from "react";
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
  getIPAddress,
} from "../redux/slices/authSlice";
import LoadingButton from "../component/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
const Login = (props) => {
  const { selectedData, title } = props;
  const navigate = useNavigate();
  const loginStatus = useSelector(loginStatusSelector);
  const authStates = useSelector(authSelector);
  const dispatch = useDispatch();
  const initialValues = {
    client_ip_address: authStates.ip,
    company_domain: "",
  };

  // formik
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      if (title === "User Login") {
        dispatch(loginUser(values));
      } else {
        dispatch(login(values));
      }
      navigate("/dashboard");
    },
  });
  // notification for login
  useEffect(() => {
    if (loginStatus) {
      toast.error(loginStatus?.message);
    } else {
      toast.error("You haven't logged in yet");
    }
  }, []);
  useEffect(() => {
    dispatch(getIPAddress());
  }, []);
  const { setValues, handleSubmit } = formikLogin;
  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);

  return (
    <>
      <div className='bg-gray-200 flex items-center justify-center w-full h-[100vh]'>
        <Card style={{ width: 500 }}>
          <FormikProvider value={formikLogin}>
            <h1 className='title text-3xl flex justify-center'>{title}</h1>
            <Form onSubmit={handleSubmit}>
              <Row gutter={16} className='leading-8'>
                <Col span={24}>
                  <FastField
                    component={AntdInput}
                    label='Client IP'
                    name='client_ip_address'
                  />
                </Col>
              </Row>
              <Row gutter={16} className='leading-8'>
                <Col span={24}>
                  <FastField
                    component={AntdInput}
                    label='Company Domain'
                    name='company_domain'
                  />
                </Col>
              </Row>
              <LoadingButton loading={authStates.loading} />
              <span className='mt-4 text-base flex justify-center text-[#73879C] '>
                Switch to
                {title === "Admin Login" ? (
                  <Link to='/login'>
                    <a className='mx-1'>User Login</a>
                  </Link>
                ) : (
                  <Link to='/admin-login'>
                    <a className='mx-1'>Admin Login</a>
                  </Link>
                )}
              </span>
            </Form>
          </FormikProvider>
          <ToastContainer />
        </Card>
      </div>
    </>
  );
};
export default Login;
