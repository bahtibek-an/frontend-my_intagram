import "./Share.css"
import usere from '../images/user.png'
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';


const Share = ({ users, url, urlType, id, getUsers, currentUser, position, dark }) => {

    const [searchUsers, setSearchUsers] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [isSelect, setIsSelect] = useState(false)

    const send = (user) => {
        setSelectedUsers((users) => {
            return [...users, user]
        })
        setIsSelect(true)
    }

    const unsend = (userr) => {
        const checkedUsers = selectedUsers.filter((user) => {
            return user !== userr
        })
        setSelectedUsers(checkedUsers)
    }

    const handleSubmit = () => {
        
        users.forEach((user)=>{
            if(selectedUsers.length === 1 && user.id === selectedUsers[0]){
                submitMessage(user.id, user)
                submitmessage(user.id)
            }else if(selectedUsers.length > 1){
                searchUsers.forEach((selecteduser)=>{
                    if(user.id === selecteduser){
                        submitMessage(selecteduser, user)
                        submitmessage(user.id)
                    }
                })
            }
        })

        setSearchUsers("")
    }

    const submitMessage = async(selectedUser, docs) => {
        const messages = docs.messages[`${id}`] ? docs.messages[`${id}`] : []
        await setDoc(doc(db, "users", `${selectedUser}`), {...docs, messages: { ...docs.messages, [id]: [...messages, { url: url, date: Date.now(), type: "incoming", urlType: urlType, id: uuidv4() }] } })
        getUsers()
    }

    const submitmessage = async(selectedUser) => {
        const messages = currentUser.messages[`${selectedUser}`] ? currentUser.messages[`${selectedUser}`] : []
        await setDoc(doc(db, "users", `${id}`), {...currentUser, messages: { ...currentUser.messages, [selectedUser]: [...messages, { url: url, date: Date.now(), type: "outgoing", urlType: urlType, id: uuidv4() }] }})
    }

    return (
        <div className='share'
        style={{position: position ? position : "",
        backgroundColor: dark ? "#3f3f3f" : "#fff"}}>
            <div className='header_coment'>
                <h4>Share</h4>
            </div>
            <div className='share_search_div'>
                <div className='share_search'>
                    <p><b>To whom:</b></p>
                    <input type="text" placeholder="Search..." value={searchUsers}
                        onChange={(e) => { setSearchUsers(e.target.value) }} 
                        style={{backgroundColor: dark ? "#3f3f3f" : "", color:  dark ? "#fff" : ""}}/>
                </div>
            </div>
            <hr />
            <div className='share_users'>
                <p style={{ textAlign: "left", fontSize: "14px" }}><b>Suggested</b></p>
                    {
                        searchUsers && 
                        users.map((user) => (
                            user.username.toLowerCase().includes(searchUsers.toLowerCase()) &&
                            <div className='share_user'>
                                <img src={usere} alt="user" width="32" />
                                <div>
                                    <p>{user.fullname}</p>
                                    <p className='grey'>{user.username}</p>
                                </div>
                                <div className="round">
                                    <input type="checkbox" value={user.id}
                                        onChange={(e) => { e.target.checked ? send(e.target.value) : unsend(e.target.value) }} />
                                </div>
                            </div>
                        ))
                    }

            </div>
            <hr />
            <div className='share_send'>
                <button onClick = {handleSubmit} style={{opacity: isSelect && selectedUsers.length !== 0 ? "1.0" : "0.4"}}>
                    Send
                </button>
            </div>
        </div>
    )
}
export default Share
