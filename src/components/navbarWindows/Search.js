
import './Search.css'
import cleare from "../images/cleare.png"
import usere from '../images/user.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = ({ dark, users, setCurrentuser, setUsername, setFirst }) => {
    const [searchUsers, setSearchUsers] = useState()

    const navigate = useNavigate()

    return (
        <>
            <h2>Search query</h2>
            <div className='search'>
                <input type="text" placeholder='Search' value={searchUsers}
                    onChange={(e) => { setSearchUsers(e.target.value) }}
                    style={{ backgroundColor: dark ? "#3f3f3f" : "", color: dark ? "#fff" : ""}} />
                <button style={{ backgroundColor: dark ? "#3f3f3f" : "" }}>
                    <img src={cleare} alt="search" width="15" height="15" 
                    onClick={()=>{setSearchUsers("")}}/>
                </button>
            </div>
            <div className='line'></div>
            {searchUsers ?
                <div>
                    {users &&
                        users.map((user)=>(
                            user.username.toLowerCase().includes(searchUsers.toLowerCase()) &&
                            <div className='search_user'
                            onClick={() => {
                                setUsername(user.username)
                                setCurrentuser(user)
                                setFirst(true)
                                setSearchUsers("")
                                navigate(`/${user.username}`, { replace: true })
                            }}>
                                <img src={user.profile ? user.profile : usere} alt="user" width="32" height="32"
                                className='user_round'/>
                                <div>
                                    <p>{user.fullname}</p>
                                    <p className='grey'>{user.username}</p>
                                </div>
                            </div>
                        ))
                    }
                </div> 
                :

                <div>
                    <p style={{ fontWeight: "600" }}>Recent</p>
                    <p className='back_text'>There are no recent requests.</p>
                </div>}
        </>
    )
}


export default Search
