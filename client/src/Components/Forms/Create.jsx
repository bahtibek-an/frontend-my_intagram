import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Create() {
  const navigate = useNavigate()
  const token = useParams();
  const [title, setTitle] = useState("")
  const [img, setImg] = useState(null)

  const headers = {
    Authorization: token.token
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
  }

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', img);

      const res = await axios.post("https://instagram-api-3pzv.onrender.com/post", formData, {headers});

      console.log(res);
      alert("Successful added post!");
      navigate(`/${token.token}`);
    } catch (error) {
      console.log("error",error);
      navigate(`/${token.token}`);
    }
  }

  return (
    <main>
      <div className="page">
        <div className="header">
          <h1 className="logo">Create your post</h1>
        </div>
        <div className="container">
          <form>
            <input type="text" name='title' placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input type="file" name="image" placeholder="Image" onChange={handleImageChange} />
          </form>
          <button onClick={handleCreate}>Add</button>
        </div>
      </div>
    </main>
  )
}

export default Create
