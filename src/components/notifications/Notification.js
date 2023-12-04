import './Notification.css'
import Notifications from '../navbarWindows/Notifications'

const Notification = ({ users, currentUser, getUsers, id }) => {
   
        return (
            <div className='not_div'>
                
                <Notifications users={users} currentUser={currentUser} getUsers={getUsers} id={id}/>
            </div>
        )
    }


    export default Notification
