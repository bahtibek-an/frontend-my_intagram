import React, { useState } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import logo from '../../img/instagram-logo.png'
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import PostCreateModal from '../../../modals/PostCreateModal';
import SearcModal from '../../../modals/SearchModal';

const Header = ({ user, token }) => {
  const [show, setShow] = useState(false);
  const [showS, setShowS] = useState(false);

  const handlePostCreateModal = () => {
    setShow(true)
  }

  const handleSearchModal = () => {
    setShowS(true)
  }
  const navigate = useNavigate();
  return (
    <>
      {
        show ? (
          <>
            <PostCreateModal show={show} setShow={setShow} token={token} />
          </>
        ) : null
      }
      {
        showS ? (
          <>
            <SearcModal show={showS} setShowS={setShowS} token={token} user={user}/>
          </>
        ) : null
      }
      <Nav className='bg-black' style={{position:'fixed',top:'100px', height: '100vh', padding: '10px 20px 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="logo-container">
          <img src={logo} alt="logo" style={{ width: '100px' }} />
        </div>
        <nav className='nav-items' style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <NavItem onClick={() => navigate(`/dashboard/${token}`)} style={{ cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><HomeIcon style={{ color: 'white', fontSize: "35px" }} /> Home</NavItem>
          <NavItem onClick={handlePostCreateModal} style={{ cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><AddBoxIcon style={{ color: 'white', fontSize: "35px" }} />  Create</NavItem>
          <NavItem onClick={handleSearchModal} style={{ cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><SearchIcon style={{ color: 'white', fontSize: "35px" }} /> Search</NavItem>
          <NavItem onClick={() => navigate(`/user/profile/${token}`)} style={{ cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><PersonIcon style={{ color: 'white', fontSize: "35px" }} /> Profile</NavItem>
        </nav>
      </Nav>

    </>

  )
}

export default Header