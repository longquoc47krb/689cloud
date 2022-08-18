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
} from "../redux/slices/authSlice";
import LoadingButton from "../component/LoadingButton";
const Login = (props) => {
  const { selectedData } = props;
  const loginStatus = useSelector(loginStatusSelector);
  const authStates = useSelector(authSelector);
  const dispatch = useDispatch();
  const initialValues = {
    client_ip_address: "",
    company_domain: "",
  };

  // formik
  const formikLogin = useFormik({
    initialValues: initialValues,
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      dispatch(login(values));
    },
  });

  // notification for login
  useEffect(() => {
    if (loginStatus) {
      toast.error(loginStatus?.message);
    } else {
      toast.success("You logged out!");
    }
  }, [loginStatus]);
  const { setValues, handleSubmit } = formikLogin;
  useEffect(() => {
    setValues(initialValues);
  }, [selectedData]);

  return (
    <>
      <div className='bg-gray-200 flex items-center justify-center w-full h-[100vh]'>
        <Card style={{ width: 500 }}>
          <FormikProvider value={formikLogin}>
            <h1 className='title text-3xl flex justify-center'>Login</h1>
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
              {/* <button
                className='w-full bg-[#325aa8] p-3 text-white'
                type='submit'>
                LOGIN
              </button> */}
              <LoadingButton loading={authStates.loading} />
            </Form>
          </FormikProvider>
          <ToastContainer />
        </Card>
      </div>
    </>
  );
};
export default Login;
