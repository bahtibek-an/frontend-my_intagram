import './Profile.css'
import userr from "../images/user.png"
import clear from "../images/cleare.png"
import { db } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const FollowingWindows = ({ currentUser, currentuser, getUsers, id, users, setUsername, setCurrentuser, userName, dark }) => {


    const navigate = useNavigate();

    const followings = currentuser && users.filter((user) => {
        return currentuser.following.filter((anotherOne_el) => {
            return anotherOne_el.userId === user.id;
        }).length !== 0
    })


    const [following, setFollowing] = useState(followings);

    const subscribe = (userId, user) => {
        folowing(userId)
        follower(userId, user)
    }

    const cancelSubscribe = (userId, user) => {
        cancelFolowing(userId)
        cancelFolowers(userId, user)
    }


    const folowing = async (userId) => {
        await setDoc(doc(db, "users", `${id}`), { ...currentUser, following: [...currentUser.following, { userId: userId }] })
        getUsers()
    }

    const cancelFolowing = async (userId) => {
        const filteredSubscribes = currentUser.following.filter((subscribe) => {
            return subscribe.userId !== userId
        })
        await setDoc(doc(db, "users", `${id}`), { ...currentUser, following: [...filteredSubscribes] })
        getUsers()
    }

    const follower = async (userId, user) => {
        await setDoc(doc(db, "users", `${userId}`), { ...user, followers: [...user.followers, { userId: id }] })
        getUsers()
    }

    const cancelFolowers = async (userId, user) => {
        const filteredSubscribes = currentUser.followers.filter((subscribe) => {
            return subscribe.userId !== id
        })
        await setDoc(doc(db, "users", `${userId}`), { ...user, followers: [...filteredSubscribes] })
        getUsers()
    }

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


    const isFollowing = (userId) => {
        let check
        if (userId === id) {
            check = null
        } else if (currentUser && currentUser.following.length === 0) {
            check = false
        } else if (currentUser && currentUser.following.length === 1) {
            currentUser.following[0].userId === userId ? check = true : check = false
        } else if (currentUser && currentUser.following.length > 1) {
            const filteredSaved = currentUser.following.some((item) => {
                return item.userId === userId
            })
            filteredSaved ? check = true : check = false
        }
        return check
    }
    return (

        <>
            <div className='upload'>
                <NavLink to={`/${userName}`}>
                    <img src={clear} alt="close" />
                </NavLink>

                <div  style={{backgroundColor: dark ? "#222" : ""}}>
                    <h3>Following</h3>
                    <div className='searchFollowers'
                     style={{backgroundColor: dark ? "#222" : ""}}>
                        <input placeholder="Search"
                         style={{backgroundColor: dark ? "#3f3f3f" : "",
                        color: dark ? "#fff" : ""}}
                            onChange={(e) => { searchFollowing(e.target.value) }} />
                    </div>
                    <div className="followers"
                     style={{backgroundColor: dark ? "#222" : ""}}>
                        {following &&
                            following.map((follower) => (
                                <div className='follower' key={follower.id}
                                style={{backgroundColor: dark ? "#222" : ""}}>
                                    <div  style={{backgroundColor: dark ? "#222" : ""}}>
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
                                    {isFollowing(follower.id) !== null ? isFollowing(follower.id) ? <p className='f_btn'
                                        onClick={() => cancelSubscribe(follower.id, follower)}
                                    >Following</p> : <p className='f_btn_b'
                                        onClick={() => subscribe(follower.id, follower)}
                                    >Follow</p> : <></>}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
    
        </>
    )

}

export default FollowingWindows