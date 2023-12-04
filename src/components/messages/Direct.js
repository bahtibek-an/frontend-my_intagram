import "./Messages.css"
import userr from "../images/user.png"
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import ReactPlayer from "react-player"
import cleare from "../images/cleare.png"
import Main from "./Main"

const Direct = ({ users, getUsers, currentUser, iD, dark, setCurrentuser, setUsername }) => {

    const { id } = useParams()
    const message = useRef()
    const [commentsWindow, setCommentsWindow] = useState(false)
    const [url, setUrl] = useState("")
    const [urlType, setUrlType] = useState("")

    const navigate = useNavigate()

    const user = id && users.filter((usr) => {
        return usr.id === id
    })

    const messages = user && currentUser.messages[`${id}`] ? currentUser.messages[`${id}`] : []
    const messagess = user && user[0].messages[`${iD}`] ? user[0].messages[`${iD}`] : []

    const sendMessage = (e) => {
        e.preventDefault()
        outgoing(message.current.value)
        incoming(message.current.value)
        message.current.value = ""
    }

    const outgoing = async (value) => {
        await setDoc(doc(db, "users", `${iD}`), { ...currentUser, messages: { ...currentUser.messages, [id]: [...messages, { message: value, date: Date.now(), type: "outgoing", id: uuidv4() }] } })
        getUsers()
    }

    const incoming = async (value) => {
        await setDoc(doc(db, "users", `${id}`), { ...user[0], messages: { ...user[0].messages, [iD]: [...messagess, { message: value, date: Date.now(), type: "incoming", id: uuidv4() }] } })
        getUsers()
    }

    return (
        <div className='chatting'>
            <div className='ch_header'
            style={{backgroundColor: dark ? "#000" : "#fff"}}>
                {user && <img src={user[0].profile ? user[0].profile : userr} className="user_round" width="50px" height="50px"/>}
                {user && <h3>{user[0].fullname}</h3>}
            </div>

            <div className='ch_main'>
                <div className='descr'>
                    {user && <img src={user[0].profile ? user[0].profile : userr} className="user_round" width="100px" height="100px" />}
                    {user && <p className='grey'>{user[0].fullname}</p>}
                    <button
                    style={{backgroundColor: dark ? "#333" : "", color: dark ? "#fff" : ""}}
                    onClick={() => {
                        setUsername(user[0].username)
                        setCurrentuser(user[0])
                        navigate(`/${user[0].username}`, { replace: true })
                    }}>View profile</button>
                </div>

                {messages &&
                    messages.map((message) => (
                        <div className="message_div" key={message.id}
                            style={{ textAlign: message.type === "incoming" ? "left" : "" }}>
                            {message.message ? <div className="message"
                                style={{
                                    backgroundColor: message.type === "incoming" ? "#dbdbdb" : "",
                                    color: message.type === "incoming" ? "#000" : ""
                                }}>{message.message}
                                <p className="small">{new Date(message.date).toLocaleDateString()}, {new Date(message.date).toLocaleTimeString()}</p>
                            </div> :
                                message.urlType === "video/mp4" ?
                                    <div className="player"
                                        onClick={() => {
                                            setUrl(message.url)
                                            setUrlType(message.urlType)
                                            setCommentsWindow(true)
                                        }}>
                                        <ReactPlayer
                                            url={message.url}
                                            width="200px"
                                            height="auto"
                                        />
                                        <p className="smal">{new Date(message.date).toLocaleDateString()}, {new Date(message.date).toLocaleTimeString()}</p>
                                    </div> :
                                    <img src={message.url} alt="chat" width="200px"
                                        onClick={() => {
                                            setUrl(message.url)
                                            setUrlType(message.urlType)
                                            setCommentsWindow(true)
                                        }}
                                    />
                            }
                        </div>
                    ))
                }


            </div>

            <div className='ch_footer'
            style={{backgroundColor: dark ? "#000" : ""}}>
                <form onSubmit={sendMessage}>
                    <input type="text" placeholder="Message..." ref={message}
                    style={{backgroundColor: dark ? "#000" : ""}} />
                </form>
            </div>
            {commentsWindow &&
                <div className="Comments">
                    <img src={cleare} alt="cleare"
                        onClick={() => setCommentsWindow(false)} />
                    <Main url={url} urlType={urlType} />
                </div>}
        </div>
    )
}

export default Direct