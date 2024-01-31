import axios from 'axios';
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
function UserEdit() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("")
  const [bio, setBio] = useState("");
  const token = useParams();
  const navigate = useNavigate();
  const [img, setImg] = useState(null)

  const headers = {
    Authorization: token.token
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
  }
  const handleEdit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("avatar", img);
  
    axios
      .patch("https://instagram-api-3pzv.onrender.com /user/edit", formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        alert("Successfully edited!");
        navigate(`/${token.token}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <main>
      <div className="page">
        <div className="header">
          <h1 className="logo">Edit your profile</h1>
        </div>
        <div className="container">
          <form>
            <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
            <input type="file" placeholder="Avatar" onChange={handleImageChange} />
            <input type="text" placeholder="Youre bio" onChange={(e) => setBio(e.target.value)} />
          </form>
          <button onClick={handleEdit}>Sign up</button>
        </div>
      </div>
    </main>
  )
}

export default UserEdit