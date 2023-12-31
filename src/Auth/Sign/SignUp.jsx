/** @format */

import React, { useState } from "react";
import "./SignUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../comonents/redux/extraReducer";
import { Button, Col, Form, Input } from "antd";

const SignUp = () => {
  const navigate = useNavigate();

  const { error,authState} = useSelector((state) => state.base);
  const [data, setData] = useState({
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU",
  });
  const dispatch = useDispatch();
  const onFinish = (value) => {
    // e.preventDefault();
    console.log({ ...value, photo: data.photo });
    dispatch(createUser({ ...value, photo: data.photo }));
    navigate("/homepage");
  };
  return (
    <div className='this-is-main-1'>
      <div className='thasts-poge'>
        <div className='hoder'>
          <h1 className='logu'>Instagram</h1>
          <p>Sign up to see photos and videos from your friends.</p>
          <button>
            <i className='fab fa-facebook-square'></i> Log in with Facebook
          </button>
          <div>
            <p>OR</p>
          </div>
        </div>
        <div className='container'>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <Form onFinish={onFinish}>
              <Form.Item name='name'>
                <Col xs={24} sm={24} md={24}>
                  <Input placeholder='Full Name'></Input>
                </Col>
              </Form.Item>
              <Form.Item name='email'>
                <Col xs={24} sm={24} md={24}>
                  <Input type='email' placeholder='Email'></Input>
                </Col>
              </Form.Item>
              <Form.Item name='password'>
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
                  Sign up
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
          Have an account? <a href='/'>Log in</a>
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
  );
};

export default SignUp;
