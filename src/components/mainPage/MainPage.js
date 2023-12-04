
import Post from '../post/Post'
import StatusBar from '../statusBar/StatusBar'
import './MainPage.css'
import cleare from '../images/cleare.png'
import react from '../images/love.svg'
import logo from '../images/logoinsta.png'
import instWhite from '../images/instWhite.png'
import hWhite from "../images/hWhite.jpg";
import { NavLink } from 'react-router-dom'

const MainPage = ({users, id, userName, getUsers, currentUser, newPublication, dark, setCurrentuser, setUsername}) => {
   
  
    return (
      <>
        <div className='navbar_home' 
        style={{backgroundColor: dark ? "#000" : "#fff"}}>
          <img src={dark ? instWhite : logo} alt="logo" className='logo'/>
          <div className='visible search'>
          <input type="text" placeholder='Search' />
          <button>
            <img src={cleare} alt="search" className='search_clear' />
          </button>
          <NavLink to="notifications"><img className='topnav_react' src={dark ? hWhite : react} alt="react" /></NavLink>
        </div>
        </div>
        
        <StatusBar users={users} id = {id} setCurrentuser= {setCurrentuser} setUsername={setUsername}/>
        <Post users={users} id={id} userName={userName} getUsers={getUsers} currentUser={currentUser} newPublication={newPublication} dark={dark}/>
      </>
    )
  }


  export default MainPage
