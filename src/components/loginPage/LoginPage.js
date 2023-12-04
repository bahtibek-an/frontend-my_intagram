import React, { useState } from 'react'
import './LoginPage.css'
import inst_logo from '../images/9364675fb26a.svg'
import insta_logo from '../images/logoinsta.png';
import appstore from '../images/app.png';
import playstore from '../images/play.png';
import SignIn from '../signIn/SignIn';
import SignUp from '../signUp/SignUp';




const LoginPage = ({setLogin, setId, getUser, getUsers, login}) => {

  const [isLogin, setIsLogin] = useState(true)

  const changeLogin = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true)
  
  }


  return (
    <div className='body'>
      <div className='loginPage'>
        <div className='left-component'>
          <img src={inst_logo} alt="ins_logo" />
        </div>
        <div className='right-component'>
          <div className="loginpage">
            <img className='logo' src={insta_logo} alt="logo" />

            {isLogin ? <SignIn setLogin={setLogin} setId={setId} getUser={getUser} getUsers={getUsers} login={login}/> : <SignUp setLogin={setLogin} setId={setId} getUser={getUser}/>}
          </div>
          <div className='loginPage_signupoption'>
            <div className='loginPage_signin'>
              {isLogin ? "Don't have an account yet? " : "Do you have an account? "}
              <span style={{ fontWeight: "bold", color: "#0395f6", cursor: "pointer" }}
                onClick={changeLogin}>
                {isLogin ? "Register" : "Entrance"}
              </span>
            </div>
            <div className='loginPage_install'>
              Install the application.
            </div>
            <div className='loginPage_apps'>
              <img className='app' src={appstore} alt="appstore" />
              <img className='app' src={playstore} alt="playstore" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}


export default LoginPage


