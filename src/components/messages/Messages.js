import { useState } from 'react'
import './Messages.css'
import user from '../images/user.png'
import edit from '../images/edit.png'
import NewMessage from './NewMessage'
import clear from "../images/cleare.png"
import pencil from "../images/pencil.png"
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'




const Messages = ({ users, chattingUsers, dark }) => {

    const [messageWindow, setMessageWindow] = useState(false)


    const filteredArray = users && users.filter(function (array_el) {
        return chattingUsers.filter(function (anotherOne_el) {
            return anotherOne_el === array_el.id;
        }).length !== 0
    });

    return (
        <div className='messages'>
            <div className='m_left'>
                <div className='m_header'>
                    <h3>nuriddinova.sayyora</h3>
                    <img src={dark ? pencil : edit} alt="edit" width="24" onClick={() => setMessageWindow(true)} />
                </div>
                <div className='m_main'>
                    <h4>Messages<span style={{ color: "#737373", float: "right" }}> Requests</span></h4>

                    {filteredArray &&
                        filteredArray.map((usr) => (
                            <NavLink to = {usr.id} style={{textDecoration: "none"}}>
                                <div className='m_user'>
                                    <img className='user_round' src={usr.profile ? usr.profile : user} alt="user" width="56" height="56"/>
                                    <div>
                                        <p style={{color: dark ? "#fff" : "#000"}}>{usr.username}</p>
                                        <p><small>{usr.fullname}</small></p>
                                    </div>
                                </div>
                            </NavLink>

                        ))
                    }
                </div>
            </div>


            <Outlet />


            {messageWindow && <div className='newMessage'>
                <NewMessage users={users} setMessagesWindow={setMessageWindow} dark={dark}/>
                <img src={clear} onClick={() => setMessageWindow(false)} />
            </div>}

        </div>
    )
}

export default Messages

