import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import UseLogout from '../../../hooks/UseLogout'

const Supbar = ({ token, user }) => {
  const {logout} = UseLogout();
  const handleLogout = () => {
    logout({token});
  }
  return (
    <div className='supbar bg-black' style={{position:"sticky",top:'100px',right:'0px', height: '100vh', paddingTop: '10px', paddingRight: '70px' }}>
      <ToastContainer
        closeOnClick
        autoClose={5000}
        rtl={false}
      />
      <div className="user_containers" style={{ padding: '10px' }}>
        <div className="user_info" style={{ display: 'flex', gap: '15px', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <img width={'40px'} height={'40px'} style={{ borderRadius: '100%' }} src={`https://instagram-server-6onu.onrender.com/avatar/image/${user._id}`} alt="" />
          {user.name}
          <Button type='info' style={{ marginLeft: '100px' }} onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
  )
}

export default Supbar