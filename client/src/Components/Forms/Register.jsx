import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import register from '../../hooks/UseRegister';
import logo from '../img/instagram-logo.png'

const Register = () => {
    const [nameV,setNameV]= useState("");
    const {registerVal} = register();
    const [passwordV,setPasswordV]= useState("");
    const oneSumbit = (e) => {
        e.preventDefault();
        registerVal({nameV,passwordV});
    }
  return (
    <Form onSubmit={oneSumbit} className='container bg-dark' style={{width:'400px',marginTop:'50px',padding:'5%',borderRadius:'10px',position:'relative', display:'flex',flexDirection:'column',alignItems:'center'}}>


        <img src={logo} alt="logo"  style={{width:'100px',position:'absolute',top:'30px',left:'30px'}}/>
        <h1 style={{color:"white", marginBottom:'30px'}}>Register</h1>


        <Form.Control placeholder='Name' style={{marginBottom:'30px',width:'100%'}} onChange={(e) => setNameV(e.target.value)}/>
        <Form.Control placeholder='Password'type='password' style={{marginBottom:'30px',width:'100%'}} onChange={(e) => setPasswordV(e.target.value)}/>


        <Button type='sumbit' style={{marginTop:'15px'}} onClick={oneSumbit}>Register</Button>
        <Form.Text style={{color:'white',marginTop:'30px'}}>Arleady member? <Link to={'/login'}>Login</Link></Form.Text>


    </Form>
  )
}

export default Register