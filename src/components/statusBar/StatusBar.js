
import './StatusBar.css'
import statusimg from "../images/user.png";
import { useNavigate } from 'react-router-dom';

const StatusBar = ({ users, id, setUsername, setCurrentuser }) => {
    const userss = users && users.filter((user)=>{
        return user.id !== id
    })

    const navigate = useNavigate()

    return (
        <div>
            {users && <div className='statusbar_container'>
                {userss &&
                    userss.map((user) => (
                        <div className='status' key={user.id}
                        onClick={() => {
                            setUsername(user.username)
                            setCurrentuser(user)
                            navigate(`/${user.username}`, { replace: true })
                        }}>
                           <img className='statusbar_status' src={user.profile ? user.profile : statusimg} alt="user" />
                            <div className='statusbar_text'>{user.username}</div>
                        </div>
                    ))
                }
            </div>}
        </div>
    )
}

export default StatusBar
