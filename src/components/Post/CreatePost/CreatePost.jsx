import React, { useState } from "react";
import "./CreatePost.scss";
import { Label } from "@mui/icons-material";
import { publishPosts } from "../../../redux/extraReducer";
import { useDispatch, useSelector } from "react-redux";
const CreatePost = ({ setModalState, user }) => {
  const { postLoading } = useSelector((state) => state.posts);
  const [postPublished, setPostPublished] = useState(false);
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
      dispatch(publishPosts(data))
        .then(() => {
          setPostPublished(true);
        
          setTimeout(() => setModalState(false), 0);
        })
        .catch((error) => {
          // Handle error if needed
          console.error("Error publishing post:", error);
        });
    }
  };
  return (
    <>
      {postLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className='modal-container'>
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
                    style={{ background: "red", marginTop: '10px' }}
                    onClick={() => setModalState(false)}>
                    Cancel
                  </button>
                  {selected ? (
              <button className='btn ' style={{ marginTop: '10px'}} onClick={publishPost}>
                Publish
              </button>
            ) : null}
                </>
              ) : (
                <>
                  <label htmlFor='' style={{ fontSize: '16px'}}>Select Image</label>
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
