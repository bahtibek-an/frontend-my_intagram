import React from 'react'
import '../Register.css'
import {useState} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
export const Login = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [err,setErr] = useState([])
    
    const handleSignUp = () =>{
    axios.post("https://instagram-api-3pzv.onrender.com/auth/login", {
        name:name,
        password:password
    }).then(res  => {
        console.log(res);
        navigate(`/${res.data.token}`)
    }).catch(e => {
      setErr(e.response.data)
        console.log(e);
    })
    }

    // useEffect(() => {
    //   handleSignUp()
    // },[])

    
  return (
    <>
     <main>
      <div className="page">
        <div className="header">
          <h1 className="logo">instagram</h1>
          <p>welcome to instagram</p>
        </div>
        <div className="container">
          <form onSubmit={handleSignUp}>
            <input type="text" placeholder="Username"     onChange={(e) => setName(e.target.value)} />
            <span className='err-msg'>{err.message}</span>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <span className='err-msg'>{err.message}</span>
          </form>
          <button onClick={handleSignUp}>Sign in</button>
        </div>
      </div>
      <div className="option">
        <p>Don'nt Have an account? <Link to={'/auth/register/'}>Sign up</Link></p>
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