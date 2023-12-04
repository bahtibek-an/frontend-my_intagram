import { useState } from "react"
import { NavLink } from "react-router-dom"
import userr from "../images/user.png"
import "./Messages.css"

const NewMessage = ({users, setMessagesWindow, dark}) => {

    const [searchUsers, setSearchUsers] = useState()
    const [isSelect, setIsSelect] = useState(false)
    const [userId, setUserId] = useState("")


    const handleSubmit = (value) => {
        setIsSelect(true)
        setUserId(value)
    }

    return (
        <div className="newMessage_div" 
        style={{backgroundColor: dark ? "#222" : ""}}>
            <div className="nm_header">
                <h3>New message</h3>
            </div>
            <div className="nm_search">
                <p><b>To:</b></p>
                <input type="text" placeholder="Search..." value={searchUsers}
                        onChange={(e) => { setSearchUsers(e.target.value) }} />
            </div>
            <div className="nm_main">
                
                {
                        searchUsers ? 
                        users.map((user) => (
                            user.username.toLowerCase().includes(searchUsers.toLowerCase()) &&
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <img src={userr} alt="user" width="32" style={{marginRight: "5px"}}/>
                                <label for={user.id}><b>{user.username}</b></label>
                                </div>
                                <input type="radio" id={user.id} value={user.id} name="userId"
                                onClick={(e)=>{
                                    e.target.checked && 
                                    handleSubmit(e.target.value)
                                }}/>
                                
                            </div>
                        )) :
                        <h4 className="grey">No account found.</h4>
                    }
            </div>
            <div className="chat">
                <NavLink to={userId}>
                    <button style={{opacity: isSelect ? "1.0" : "0.4"}} onClick={()=>{setMessagesWindow(false)}}>Chat</button>
                </NavLink>
                
            </div>
        </div>
    )
}

export default NewMessage