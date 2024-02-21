import React, { useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import login from '../../hooks/UseLogin'
import logo from '../img/instagram-logo.png'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
const Login = () => {
    const [emailV,setEmailV]= useState("")
    const [passwordV,setPasswordV]= useState("")
    const {loginVal} = login();
    const oneSumbit = (e) => {
        e.preventDefault();
        loginVal({emailV,passwordV});
    }
    
    // const not = () => toast
  return (
    <Form onSubmit={oneSumbit} className='container bg-dark' style={{width:'400px',marginTop:'50px',padding:'5%',borderRadius:'10px',position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <ToastContainer
          closeOnClick
          autoClose={5000}
          rtl = {false}
      />
        <img src={logo} alt="logo"  style={{width:'100px',position:'absolute',top:'30px',left:'30px'}}/>
        <h1 style={{color:"white", marginBottom:'30px'}}>Login</h1>
        <Form.Control placeholder='User name' style={{marginBottom:'30px',width:'100%'}} onChange={(e) => setEmailV(e.target.value)}/>
        <Form.Control placeholder='Password' onChange={(e) => setPasswordV(e.target.value)}/>
        <Button type='sumbit' style={{marginTop:'15px'}} onClick={oneSumbit}>Login</Button>
        <Form.Text style={{color:'white',marginTop:'30px'}}>Arleady member? <Link to={'/login'}>Login</Link></Form.Text>
    </Form>
  )
}

export default Login