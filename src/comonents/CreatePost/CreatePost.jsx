/** @format */

import React, { useState } from "react";
import "./CreatePost.scss";
import { useDispatch, useSelector } from "react-redux";
import { publishPosts } from "../redux/extraReducer";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Modal } from "antd";
const CreatePost = ({ setVisibleUploadModal, visibleUploadModal, user }) => {
  const { postLoading } = useSelector((state) => state.base);
  var dispatch = useDispatch();
  // this is func
  const [data, setData] = useState({
    // this is func
    user: user,
    title: "title",
    imageUpload: "",
  });
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();
  const [selected, setSelected] = useState();
  const [selectedImg, setSelectedImg] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setSelected(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImg(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onFinish = (values) => {
    dispatch(
      publishPosts({
        user: user,
        title: values.title,
        imageUpload: file,
      })
    );
  };
  return (
    <>
      {postLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
        <Modal open={visibleUploadModal} footer={null} onCancel={null}>
          <div className='modal-container'>
            <span
              className='close__modal__icon'
              onClick={() => setVisibleUploadModal(false)}>
              <FontAwesomeIcon icon={faClose} />
            </span>
            {/* {selected ? (
           
            ) : null} */}
            <div>
              {selected ? (
                <>
                  <div className='selected__img__container'>
                    <img src={selectedImg} alt='' />
                  </div>
                  <Form onFinish={onFinish}>
                    <Form.Item
                      name='title'
                      rules={[
                        {
                          required: true,
                          message: "Title cannot be Empty",
                        },
                      ]}>
                      <Input placeholder='Title' />
                    </Form.Item>
                    <div className='buttons'>
                      <Button
                        className='btn'
                        danger
                        onClick={() => setVisibleUploadModal(false)}>
                        Cancel
                      </Button>
                      <Button className='btn' type='primary' htmlType='submit'>
                        Publish
                      </Button>
                    </div>
                  </Form>
                </>
              ) : (
                <>
                  <label className='labelforinput' htmlFor=''>
                    Select from compyter
                  </label>
                  <label htmlFor='file' className='labelforselect'>
                    Browse
                  </label>
                  <input
                    type='file'
                    onChange={handleFileChange}
                    id='file'
                    accept='image/*'
                  />
                </>
              )}
            </div>
          </div>
          </Modal>
          <div className='w-screen'></div>
        </>
      )}
    </>
  );
};

export default CreatePost;
