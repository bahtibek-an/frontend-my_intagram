import './Messages.css'
import messages from '../images/message.png'
import { useState } from 'react'
import NewMessage from './NewMessage'
import clear from "../images/cleare.png"


const Inbox = ({users, getUsers, id, currentUser, userName, dark}) => {

    const [messageWindow, setMessageWindow] = useState(false)

    return (
        <>
            <div className='m_right'>
                <div>
                    <img src={messages} alt="messages" />
                </div>
                <h2>your messages</h2>
                <p>Send private photos and messages to a friend or group</p>
                <button onClick={()=>setMessageWindow(true)}>send a message</button>
            </div>

            {messageWindow && <div className='newMessage'>
                <NewMessage setMessageWindow={setMessageWindow} users={users} getUsers={getUsers} id={id} currentUser={currentUser} userName={userName} dark={dark}/>
                <img src={clear} onClick={() => setMessageWindow(false)} />
            </div>}
        </>
    )
}

export default Inbox