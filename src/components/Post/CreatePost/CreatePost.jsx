/** @format */

import React, { useState } from "react";
import "./CreatePost.scss";
import { Label } from "@mui/icons-material";
import { publishPosts } from "../../../redux/extraReducer";
import { useDispatch, useSelector } from "react-redux";
const CreatePost = ({ setModalState, user }) => {
  const { postLoading } = useSelector((state) => state.posts);
  var dispatch = useDispatch();
  const [data, setData] = useState({
    user: user,
    title: "title",
    imageUpload: "",
    description: "",
  });
  const [selected, setSelected] = useState();
  const [selectedImg, setSelectedImg] = useState(false);
  const handleFileChange = (event) => {
    setData((prev) => ({ ...prev, imageUpload: event.target.files[0] }));
    setSelected(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImg(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const publishPost = () => {
    if (data.title != null) {
      dispatch(publishPosts(data));
    }
  };
  return (
    <>
      {postLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className='modal-container'>
            {selected ? (
              <button className='btn ' onClick={publishPost}>
                Publish
              </button>
            ) : null}
            <div>
              {selected ? (
                <>
                  <div className='selected__img__container'>
                    {" "}
                    <img src={selectedImg} alt='' />
                  </div>
                  <form>
                    <label>title</label>
                    <input
                    placeholder="title"
                      type='text'
                      className='form-controller'
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, title: e.target.value }))
                      }
                    />
                    <label>Description</label>
                       <input
                    placeholder="Description"
                      type='text'
                      className='form-controller'
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                  </form>
                  <button
                    className='btn'
                    style={{ background: "red" }}
                    onClick={() => setModalState(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <label htmlFor=''>Select from compyter</label>
                  <input
                    type='file'
                    onChange={handleFileChange}
                    accept='image/*'
                  />
                </>
              )}
            </div>
          </div>
          <div className='w-screen'></div>
        </>
      )}
    </>
  );
};

export default CreatePost;
