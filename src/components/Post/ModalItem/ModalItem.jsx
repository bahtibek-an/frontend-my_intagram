/** @format */

import React, { useState } from "react";
import "./ModalItem.scss";
import { useDispatch } from "react-redux";
import { chaneg, changeUserProfile, updateDisplayNameAsync } from "../../../redux/extraReducer";
import { DateRange } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const ModalItem = ({ setUserSetting, userPhoto, userName, user}) => {
  const [newDisplayName, setDisplayName] = useState("");
  const [userImage, setUserImage] = useState(userPhoto);
  const [selectedImage, setSelectedImage] = useState()
  var dispatch = useDispatch();
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(newDisplayName);

    dispatch(updateDisplayNameAsync(newDisplayName));
  };
  const [data, setData] = useState({
    img: userPhoto,
    username: userName,
    user:user
  });

  const handleProfileImageChange = (e) => {
    // setData((prev) => ({ ...prev, img: e.target.files[0] }));

    const file = e.target.files[0];
    const reader = new FileReader();
    setData((prev)=>({...prev, img:e.target.files[0]}))
    reader.onload = (e) => {
      setUserImage(e.target.result)
    };
    reader.readAsDataURL(file);
  };

  const pushing = (e)=>{
    e.preventDefault();
    console.log(data)
    dispatch(chaneg(data))
  }

  return (
    <>

      <div className='user_setting'>
        <span className='close-btn' onClick={() => setUserSetting(false)}>
          x
        </span>
        <form className='update-user-container' onSubmit={pushing}>
          <div className='user__profile__container'>
            <img src={userImage} alt='' />
          </div>
          <div className='user__upload__container'>
            <label for='upload'>+</label>
            <input
              type='file'
              id='upload'
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
          </div>
          <input
            type='text'
            placeholder='UserName'
            id=''
            // required
            value={data.username}
            onChange={(e) =>
              setData((prev) => ({ ...prev, username: e.target.value }))
            }
          />

          <button className='btn' type='submit'>
            Save
          </button>
        </form>
      </div>
      <div className='w-screen'></div>
    </>
  );
};

export default ModalItem;
