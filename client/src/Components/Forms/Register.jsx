import React, {} from 'react'
import '../Register.css'
import {useState} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
export const Register = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");


    const handleSignUp = () => {
      console.log("Sign Up called");
          axios
          .post("https://instagram-api-3pzv.onrender.com/auth/register", {
              name:name,
              password:password
          }).then((res)  => {
              console.log(res);
              alert("Successfull registered!")
              navigate(`/${res.data.token}`)
          }).catch((e) => {
            alert("Error in Sign Up")
            console.log(e);
          })
    }


    
  return (
    <>
     <main>
      <div className="page">
        <div className="header">
          <h1 className="logo">Register</h1>
          <p>When you register, you will see photos of your friends</p>
        </div>
        <div className="container">
          <form>
            <input type="text" placeholder="Username"     onChange={(e) => setName(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          </form>
            <button onClick={handleSignUp}>Sign up</button>
        </div>
      </div>
      <div className="option">
        <p>Have an account? <Link to={'/'}>Log in</Link></p>
      </div>
      <div className="otherapps">
        <p>Get the app.</p>
        <button type="button"><i className="fab fa-apple"></i> App Store</button>
        <button type="button"><i className="fab fa-google-play"></i> Google Play</button>
      </div>
    </main>
    </>
  )
}