/** @format */

import React, { useState } from "react";
import "./ModalItem.scss";
import { useDispatch } from "react-redux";
import { updateDisplayNameAsync } from "../../../redux/extraReducer";
const ModalItem = ({ setUserSetting }) => {
  const [newDisplayName, setDisplayName] = useState("");
  var dispatch = useDispatch();
  const handleUpdate = (e) => {
    e.preventDefault();
    // console.log(newDisplayName);

    dispatch(updateDisplayNameAsync(newDisplayName));

    // alert("Done");
  };
  return (
    <>
      <div className='user_setting'>
        <span className='close-btn' onClick={() => setUserSetting(false)}>
          x
        </span>
        <form className='update-user-container' onSubmit={handleUpdate}>
          <input
            type='text'
            placeholder='UserName'
            id=''
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input type='text' name='' placeholder='email' id='' />
          <input type='text' name='' placeholder='Password' id='' />
          <button className='btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
      <div className='w-screen'></div>
    </>
  );
};

export default ModalItem;
