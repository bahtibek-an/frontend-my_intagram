import './Profile.css'
import user from "../images/user.png"
import clear from "../images/cleare.png"
import { db } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const FollowesWindow = ({ currentUser, getUsers, id, users, setUsername, setCurrentuser, userName, username, dark }) => {

    const followerss = users && users.filter(function (array_el) {
        return currentUser.followers.filter(function (anotherOne_el) {
            return anotherOne_el.userId === array_el.id;
        }).length !== 0
    })

    const navigate = useNavigate();

    const [followers, setFollowers] = useState(followerss);

    const following = async (userId) => {
        await setDoc(doc(db, "users", `${id}`), { ...currentUser, following: [...currentUser.following, { userId: userId }] })
        getUsers()
    }

    const cancelFollowing = async (userId) => {
        const filteredSubscribes = currentUser.following.filter((subscribe) => {
            return subscribe.userId !== userId
        })
        await setDoc(doc(db, "users", `${id}`), { ...currentUser, following: [...filteredSubscribes] })
        getUsers()
    }

    const folower = async (userId, user) => {
        await setDoc(doc(db, "users", `${userId}`), { ...user, followers: [...user.followers, { userId: id }] })
        getUsers()
    }

    const cancelFollowers = async (userId, user) => {
        const filteredSubscribes = currentUser.followers.filter((subscribe) => {
            return subscribe.userId !== id
        })
        await setDoc(doc(db, "users", `${userId}`), { ...user, followers: [...filteredSubscribes] })
        getUsers()
    }

    const removeFollower = async (userId) => {
        const filteredFollowers = currentUser.followers.filter((follower) => {
            return follower.userId !== userId
        })
        await (setDoc(doc(db, "users", `${id}`), { ...currentUser, followers: [...filteredFollowers] }))
        getUsers()
    }

    const removeFollowing = async (user, userId) => {
        const filteredFollowing = user.following.filter((fol) => {
            return fol.userId !== id
        })
        await setDoc(doc(db, "users", `${userId}`), { ...user, following: [...filteredFollowing] })
        getUsers()
    }

    const remove = (user, userId) => {
        removeFollower(userId)
        removeFollowing(user, userId)
    }

    const subscribe = (userId, user) => {
        const check = currentUser.following.some((subscribe) => {
            return subscribe.userId === userId
        })
        if (check) {
            cancelFollowing(userId)
            cancelFollowers(userId, user)
        } else {
            following(userId)
            folower(userId, user)
        }
    }


    const isFollowing = (userId) => {
        let check

        if (currentUser && currentUser.following.length === 0) {
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

    const searchFollowers = (value) => {
        if (value !== "") {
            const userss = followers.filter((user) => {
                return user.username.toLowerCase().includes(value.toLowerCase())
            })
            setFollowers(userss)
        } else {
            setFollowers(followerss)
        }
    }

    return (

        <div className='upload'>
            <NavLink to={`/${userName}`}>
                <img src={clear} alt="close" />
            </NavLink>
            <div style={{backgroundColor: dark ? "#222" : ""}}>
                <h3>Followers</h3>
                <div className='searchFollowers'
                style={{backgroundColor: dark ? "#222" : ""}}>
                    <input placeholder="Search"
                    style={{backgroundColor: dark ? "#3f3f3f" : "", color: dark ? "#fff" : ""}}
                        onChange={(e) => { searchFollowers(e.target.value) }} />
                </div>
                <div className="followers"
                style={{backgroundColor: dark ? "#222" : ""}}>
                    {followers &&
                        followers.map((follower) => (
                            <div className='follower' key={follower.id}
                            style={{backgroundColor: dark ? "#222" : ""}}>
                                <div style={{backgroundColor: dark ? "#222" : ""}}>
                                    <img src={follower.profile ? follower.profile : user}
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
                                    {isFollowing(follower.id) ? <></> : <p className="following"
                                        onClick={() => subscribe(follower.id, follower)}
                                    >Follow</p>}
                                </div>
                                <p className='f_btn'
                                    onClick={() => { remove(follower, follower.id) }}>Remove</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>



    )

}

export default FollowesWindow