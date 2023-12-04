import { useState } from 'react'
import './NavBar.css'
import Search from '../navbarWindows/Search';
import insta_logo from '../images/logoinsta.png';
import inst_icon from '../images/instagram.png'
import insWhite from '../images/insWhite.png'
import instWhite from '../images/instWhite.png'
import home from "../images/home.svg";
import homeWhite from "../images/homeWhite.webp";
import message from "../images/message.svg";
import mWhite from "../images/mWhite.png";
import find from "../images/find.svg";
import react from "../images/love.svg";
import hWhite from "../images/hWhite.jpg";
import Avatar from '@material-ui/core/Avatar';
import clear from "../images/cleare.png"
import reels from "../images/reels.png"
import reelsWhite from "../images/reelsWhite.webp"
import createe from "../images/create.png"
import cWhite from "../images/cWhite.png"
import searche from "../images/search.png"
import searchWhite from "../images/searchWhite.jpeg"
import moree from "../images/more.png"
import moreWhite from "../images/moreWhite.png"
import { NavLink } from 'react-router-dom';
import Notifications from '../navbarWindows/Notifications';
import Create from '../create_section/Create';
import More from '../navbarWindows/More';


const NavBar = ({ loginOut, getUsers, users, id, setNewPublication, currentUser, userName, setdark, dark, setCurrentuser, setUsername}) => {

    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(true)
    const [third, setThird] = useState(false)
    const [openmore, setOpenmore] = useState(false)

    const search = () => {
        if (first) {
            setFirst(false)
        } else {
            setFirst(true)
        }
    }

    const notification = () => {
        if (second) {
            setSecond(false)
        } else {
            setSecond(true)
        }
    }

    const create = () => {
        if (!third) {
            setThird(true)
        }
    }

    const close = () => {
        if (third) {
            setThird(false)
        }
    }

    const more = () => {
        openmore ? setOpenmore(false) : setOpenmore(true)
    }

    return (
        <>
            <div className='navbar' style={{ width: (!first || !second) && "70px", backgroundColor: dark ? "#000" : "#fff" }} >
                <NavLink to="/">{dark ? <img className='navbar_logo' src={first && second ? instWhite : insWhite} alt="ins_logo" width={first && second ? "105px" : "35px"} /> :
                <img className='navbar_logo' src={first && second ? insta_logo : inst_icon} alt="ins_logo" width={first && second ? "105px" : "35px"} />}</NavLink>
                <NavLink to="/"><img className='navbar_icon' src={dark ? insWhite : inst_icon} alt="icon" /></NavLink>
                <nav className='nav'>
                    <NavLink style={{color: dark ? "#fff" : "#000"}}
                     to="/"><div className='navbar_div'><img className='navbar_img' src={dark ? homeWhite : home} width="25" alt="home" /><p className='navbar_name'>home</p></div></NavLink>
                    <div className='navbar_div' onClick={search}><img className='navbar_img' src={dark ? searchWhite : searche} alt="search" /><p className='navbar_name'>Search query</p></div>
                    <NavLink  style={{color: dark ? "#fff" : "#000"}}
                    to="interesting"><div className='navbar_div'><img className='navbar_img' src={find} width="25" alt="find" /><p className='navbar_name'>Interesting</p></div></NavLink>
                    <NavLink  style={{color: dark ? "#fff" : "#000"}}
                     to="reels"><div className='navbar_div'><img className='navbar_img' src={dark ? reelsWhite : reels} width="25" alt="find" /><p className='navbar_name'>Reels</p></div></NavLink>
                    <NavLink  style={{color: dark ? "#fff" : "#000"}}
                     to='messages' ><div className='navbar_div'><img className='navbar_img' src={dark ? mWhite : message} width="25" alt="message" /><p className='navbar_name'>Message</p></div></NavLink>
                    <div className='navbar_div' onClick={notification}><img className='navbar_img' src={dark ? hWhite : react} width="25" alt="react" /><p className='navbar_name'>Notification</p></div>
                    <div className='navbar_div' onClick={create}><img className='navbar_img' src={dark ? cWhite : createe} width="25" alt="react" /><p className='navbar_name'>Create</p></div>
                    <NavLink  style={{color: dark ? "#fff" : "#000"}}
                     to={userName}><div className='navbar_div'><Avatar className='navbar_img' style={{ "maxWidth": "25px", "maxHeight": "25px" }} /><p className='navbar_name'>Profile</p></div></NavLink>
                </nav>
                <div className='more_nav'
                    onClick={more}>
                    <img src={dark ? moreWhite : moree} alt="more" width="24" />
                    <p className='navbar_name'>More</p>
                </div>
                {openmore && <More loginOut={loginOut} setdark={setdark} dark={dark} setOpenmore={setOpenmore}/>}
            </div>
            <div className='search_area' 
            style={{ left: first ? '' : '70px', backgroundColor: dark ? "#000" : "#fff" }}>
                <Search dark={dark} users={users} setCurrentuser={setCurrentuser} setUsername={setUsername} setFirst={setFirst}/>
            </div>
            <div className='notifications' style={{ left: second ? '' : '70px', backgroundColor: dark ? "#000" : "#fff"}}>
                <Notifications users={users} currentUser={currentUser} getUsers={getUsers} id={id} />
            </div>

            {third &&
                <div className='create' >
                    <img className='c_clear' src={clear} alt="clear"
                        onClick={close} />
                    <Create getUsers={getUsers} users={users} id={id} close={close} setNewPublication={setNewPublication} dark={dark}/>
                </div>
            }

        </>

    )
}

export default NavBar