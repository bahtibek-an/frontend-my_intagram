/** @format */

import React, { useState } from "react";
import './Home.scss'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../comonents/redux/extraReducer";
import Loader from "../../comonents/Loader/Loader";
import { Col, Form, Input, Button} from "antd";

const Home = () => {
  var dipatch = useDispatch();
  // thisssss
  const { error, postLoading, authState} = useSelector((state) => state.base);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const onFinish = (values) => {
    console.log(values)
    dipatch(UserLogin(values));
    navigate("/");
  };
  console.log(error)
  return (
    <>
      {postLoading ? (
        <Loader />
      ) : (
        <>
 <div className='this-is-main-1'>
      <div className='thasts-poge'>
        <div className='hoder'>
          <h1 className='logu'>Instagram</h1>
          <div></div>
        </div>
        <div className='container'>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <Form onFinish={onFinish}>
              <Form.Item name='email' rules={[{
                required:true,
                message:"Please write your email"
              }]}>
                <Col xs={24} sm={24} md={24}>
                  <Input type='email' placeholder='Email'></Input>
                </Col>
              </Form.Item>
              <Form.Item name='password'  rules={[{
                required:true,
                message:"Please write your Password"
              }]}>
                <Col xs={24} sm={24} md={24}>
                  <Input.Password placeholder='Password'></Input.Password>
                </Col>
              </Form.Item>
              <Col xs={24} sm={24} md={24}>
                <Button
                loading={authState}
                  style={{ width: "100%" }}
                  type='submit'
                  htmlType='submit'>
                  Login
                </Button>
              </Col>
            </Form>
          )}
          <ul>
            <li>By signing up, you agree to our</li>
            <li>
              <a href=''>Terms</a>
            </li>
            <li>
              <a href=''>Data Policy</a>
            </li>
            <li>and</li>
            <li>
              <a href=''>Cookies Policy</a> .
            </li>
          </ul>
        </div>
      </div>
      <div className='option'>
        <p>
          Don't an account? <a href='/sign-up'>Sign up</a>
        </p>
      </div>
      <div className='otherapps'>
        <p>Get the app.</p>
        <button type='button'>
          <i className='fab fa-apple'></i> App Store
        </button>
        <button type='button'>
          <i className='fab fa-google-play'></i> Google Play
        </button>
      </div>
      <div className='footer'>
        <ul>
          <li>
            <a href=''>ABOUT</a>
          </li>
          <li>
            <a href=''>HELP</a>
          </li>
          <li>
            <a href=''>PRESS</a>
          </li>
          <li>
            <a href=''>API</a>
            {/* this is comment for login page */}
          </li>
          <li>
            <a href=''>JOBS</a>
          </li>
          <li>
            <a href=''>PRIVACY</a>
          </li>
          <li>
            <a href=''>TEMS</a>
          </li>
          s
          <li>
            <a href=''>LOCATIONS</a>
          </li>
          <li>
            <a href=''>TOP ACCOUNTS</a>
          </li>
          <li>
            <a href=''>HASHTAGS</a>
          </li>
          <li>
            <a href=''>LANGUAGE</a>
          </li>
        </ul>
        <p>© 2020 PICTUREGRAM</p>
      </div>
    </div>
        </>
      )}
    </>
  );
};

export default Home;
