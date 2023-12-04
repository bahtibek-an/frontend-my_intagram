
import './Profile.css'
import userr from "../images/user.png"
import publ from "../images/publ.jpeg"
import marks from "../images/marks.png"
import { NavLink, Outlet } from 'react-router-dom'


const Profiles = ({ currentUser, userName, dark }) => {

    console.log(currentUser)


    return (
        <>
        {currentUser && <div className='profile'>
            <div className='profile_user'>
                <div className='p_user-img'>
                    <button>
                        <img src={currentUser.profile ? currentUser.profile : userr} className="user_round" alt="user" />
                    </button>
                </div>
                <div className='p_user-desc'>
                    <p>{currentUser && currentUser.username}</p>
                </div>
                <div className='p_info'>
                    <div>
                        {currentUser && <p><b>{currentUser.publications.length}</b></p>}
                        <p>posts</p>
                    </div>
                    <NavLink to="followers"
                    style={{color: dark ? "#fff" : ""}}>
                        {currentUser && <p><b>{currentUser.followers.length}</b></p>}
                        <p>followers</p>
                    </NavLink>
                    <NavLink to= "following"
                    style={{color: dark ? "#fff" : ""}}>
                        {currentUser && <p><b>{currentUser.following.length}</b></p>}
                        <p>following</p>
                    </NavLink>

                </div>
                <div className='p_name'>
                    <h4>{currentUser && currentUser.fullname}</h4>
                </div>
            </div>
            <div className='line' style={{ width: "120%" }}></div>
            <nav className='p_nav'>
                <NavLink to={`/${userName}`}>
                    <img src={publ} alt="publ" />
                    <p>POSTS</p>
                </NavLink>
                <NavLink to="marks">
                    <img src={marks} alt="marks" />
                    <p>TAGGED</p>
                </NavLink>
            </nav>
            <div className='p_main'>
                <Outlet />
            </div>

        </div>}
        </>
    )
}
export default Profiles
