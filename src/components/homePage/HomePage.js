import NavBar from '../navBar/NavBar'
import './HomePage.css'
import { NavLink, Outlet } from 'react-router-dom'
import home from "../images/home.svg";
import message from "../images/message.svg";
import find from "../images/find.svg";
import reels from "../images/reels.png"
import create from "../images/create.png"
import clear from "../images/cleare.png"
import homeWhite from "../images/homeWhite.webp";
import mWhite from "../images/mWhite.png";
import reelsWhite from "../images/reelsWhite.webp"
import cWhite from "../images/cWhite.png"
import Create from '../create_section/Create'
import { Avatar } from '@material-ui/core';


const HomePage = ({loginOut, getUsers, users, id, setNewPublication, currentUser, setOpen, open, userName, setdark, dark, setCurrentuser, setUsername}) => {
    

    const publications = () => {
        if(!open){
            setOpen(true)
        }
    }

    const close = () => {
        if (open) {
            setOpen(false)
        }
    }

        return (
            <div className='home' style={{backgroundColor: dark ? "#000" : "#fff", color: dark ? "#fff" : "#000"}}>
                <div className='main'>
                    <header className='header '>
                        <NavBar loginOut={loginOut} getUsers={getUsers} users={users} id={id} setNewPublication={setNewPublication} currentUser={currentUser} userName={userName} setdark={setdark} dark={dark}
                        setCurrentuser={setCurrentuser} setUsername={setUsername}/>
                    </header>
                    <main className='mainContent_container'>
                        <Outlet />
                    </main>
                </div>
                <footer className='footer'>
                    <div className='bottom_nav'
                    style={{backgroundColor: dark ? "#000" : "#fff"}}>
                        <NavLink to="/"><img src={dark ? homeWhite : home} alt="link" width="25" /></NavLink>
                        <NavLink to="interesting"><img src={find} alt="link" width="25" /></NavLink>
                        <NavLink to="reels"><img src={dark ? reelsWhite : reels} alt="link" width="25" /></NavLink>
                        <div onClick={publications}><img src={dark ? cWhite : create} alt="link" width="25" height="25" /></div>
                        <NavLink to='messages'><img src={dark ? mWhite : message} alt="link" width="25" /></NavLink>
                        <NavLink to={userName}><Avatar style={{ "maxWidth": "25px", "maxHeight": "25px" }} /></NavLink>
                    </div>
                </footer>
                {open &&
                    <div className='create'>
                        <img className='c_clear' src={clear} alt="clear"
                        onClick={close} />
                        <Create getUsers={getUsers} users={users} id={id} close={close} setNewPublication={setNewPublication}/>
                    </div>
                }

            </div>
        )
    }

    export default HomePage