import './Profile.css'
import userr from "../images/user.png"
import clear from "../images/cleare.png"
import { db } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const FollowingWindow = ({ currentUser, getUsers, id, users, setUsername, setCurrentuser, userName, username, dark }) => {

    const [uploadWin, setUploadWin] = useState(false)
    const [userId, setUserId] = useState("")
    const [profile, setProfile] = useState("")
    const [user, setUser] = useState([])

    const navigate = useNavigate();

    const followings = users && users.filter((user) => {
        return currentUser.following.filter((anotherOne_el) => {
            return anotherOne_el.userId === user.id;
        }).length !== 0
    })


    const [following, setFollowing] = useState(followings);

    const searchFollowing = (value) => {
        if (value === "") {
            setFollowing(followings)
        } else {
            const userss = following.filter((user) => {
                return user.username.toLowerCase().includes(value.toLowerCase())
            })
            setFollowing(userss)
        }
    }

    const cancelFollowing = async () => {
        const filteredSubscribes = currentUser.following.filter((subscribe) => {
            return subscribe.userId !== userId
        })
        await setDoc(doc(db, "users", `${id}`), { ...currentUser, following: [...filteredSubscribes] })
        getUsers()
    }

    const cancelFollowers = async () => {
        const filteredSubscribes = currentUser.followers.filter((subscribe) => {
            return subscribe.userId !== id
        })
        await setDoc(doc(db, "users", `${userId}`), { ...user, followers: [...filteredSubscribes] })
        getUsers()
    }

    const unfollow = () => {
        cancelFollowers()
        cancelFollowing()
        setUploadWin(false)
    }

    return (

        <>
            <div className='upload'>
                <NavLink to={`/${userName}`}>
                    <img src={clear} alt="close" />
                </NavLink>
                
                <div style={{backgroundColor: dark ? "#222" : ""}}>
                    <h3>Following</h3>
                    <div className='searchFollowers'
                     style={{backgroundColor: dark ? "#222" : ""}}>
                        <input placeholder="Search"
                         style={{backgroundColor: dark ? "#3f3f3f" : "", color: dark ? "#fff" : ""}}
                            onChange={(e) => { searchFollowing(e.target.value) }} />
                    </div>
                    <div className="followers"
                     style={{backgroundColor: dark ? "#222" : ""}}>
                        {following &&
                            following.map((follower) => (
                                <div className='follower' key={follower.id}
                                style={{backgroundColor: dark ? "#222" : ""}}>
                                    <div
                                     style={{backgroundColor: dark ? "#222" : ""}}>
                                           <img src={follower.profile ? follower.profile : userr}
                                            className="user_round"
                                            width="40"
                                            height="40"
                                            onClick={() => {
                                                setUsername(follower.username)
                                                setCurrentuser(follower)
                                                navigate(`/${follower.username}`, { replace: true })
                                            }}
                                        /> 
                                        

                                        <p><b>{follower.username}</b></p>
                                    </div>
                                    <p className='f_btn'
                                        onClick={() => {
                                            setUsername(follower.username)
                                            setUser(follower)
                                            setUserId(follower.id)
                                            setProfile(follower.profile[0] ? follower.proofile[0].url : userr)
                                            setUploadWin(true)
                                        }}
                                    >Following</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {uploadWin && <div className='upload' onClick={() => { setUploadWin(false) }}>
                <div className='unfollow'
                 style={{backgroundColor: dark ? "#222" : ""}}>
                    <img src={profile} width="80" />
                    <p>Unfollow {username}</p>
                    <div
                     style={{backgroundColor: dark ? "#222" : ""}}>
                        <button onClick={unfollow}>Unfollow</button>
                        <button onClick={() => { setUploadWin(false) }}
                         style={{color: dark ? "#fff" : ""}}>Cancel</button>
                    </div>
                </div>
            </div>}
        </>
    )

}

export default FollowingWindow