import './Notifications.css'
import postimage from "../images/user.png";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { NavLink } from 'react-router-dom';

const Notifications = ({ users, currentUser, getUsers, id, dark }) => {

    const weeksUsers = users && users.filter((user) => {
        const dateNow = Date.now()
        const dated = (dateNow - user.date) / 1000 / 86400
        return dated <= 7
    })

    const monthUsers = users && users.filter((user) => {
        const dateNow = Date.now()
        const dated = (dateNow - user.date) / 1000 / 86400
        return dated > 7 && dated <= 30
    })

    const following = async(userId) => {
        await setDoc(doc(db, "users", `${id}`), {...currentUser, following: [...currentUser.following, {userId: userId}]})
        getUsers()
    }
  
    const cancelFollowing = async(userId) => {
      const filteredSubscribes = currentUser.following.filter((subscribe)=>{
        return subscribe.userId !== userId
      })
      await setDoc(doc(db, "users", `${id}`), {...currentUser, following: [...filteredSubscribes]})
      getUsers()
    }
  
    const follower = async(userId, user) => {
      await setDoc(doc(db, "users", `${userId}`), {...user, followers: [...user.followers, {userId: id}]})
      getUsers()
    }
  
    const cancelFollowers = async(userId, user) => {
      const filteredSubscribes = currentUser.followers.filter((subscribe)=>{
        return subscribe.userId !== id
      })
      await setDoc(doc(db, "users", `${userId}`), {...user, followers: [...filteredSubscribes]})
      getUsers()
    }


    return (
        <>
            <h2>
                <NavLink to="/" 
                className="back"
                style={{color: !dark && "#fff" , textDecoration: "none"}}>
                  <p>{"<"}</p> 
                </NavLink>
                Notifications</h2>
            <div>
                <h3>this week</h3>

                {users ? weeksUsers.length !== 0 &&
                    weeksUsers.map((usr) => (
                        <div className='subs'>
                            <div><img src={usr.profile ? usr.profile : postimage} alt="" width="50" height="50" className='user_round' /></div>
                            <div>
                               {currentUser && currentUser.followers.some((fol)=>{
                                    return fol.userId === usr.id
                                }) ? <p className='user'><b>{usr.username}</b> started following you</p> :
                                <p className='user'><b>{usr.username}</b> is on Instagram</p>}
                            </div>
                            <div className='btn'>
                                {currentUser && currentUser.following.some((fol)=>{
                                    return fol.userId === usr.id
                                }) ? <button style={{backgroundColor: "#dbdbdb", color: "#000"}}
                                onClick={()=>{
                                    cancelFollowing(usr.id)
                                    cancelFollowers(usr.id, usr)
                                }}>Following</button> : <button onClick ={()=>{
                                    following(usr.id)
                                    follower(usr.id, usr)
                                }}>Follow</button> }
                            </div>
                        </div>
                    )) : <></>
                }

                <div className='line'></div>
                <h3>This month</h3>

                {users ? monthUsers.length !== 0 &&
                    monthUsers.map((usr) => (
                        <div className='subs'>
                            <div><img src={usr.profile ? usr.profile : postimage} alt="" width="50" height="50" className='user_round'/></div>
                            <div>
                               {currentUser && currentUser.followers.some((fol)=>{
                                    return fol.userId === usr.id
                                }) ? <p className='user'><b>{usr.username}</b> started following you</p> :
                                <p className='user'><b>{usr.username}</b> is on Instagram</p>}
                            </div>
                            <div className='btn'>
                                {currentUser && currentUser.following.some((fol)=>{
                                    return fol.userId === usr.id
                                }) ? <button style={{backgroundColor: "#dbdbdb", color: "#000"}}
                                onClick={()=>{
                                    cancelFollowing(usr.id)
                                    cancelFollowers(usr.id, usr)
                                }}>Following</button> : <button onClick ={()=>{
                                    following(usr.id)
                                    follower(usr.id, usr)
                                }}>Follow</button> }
                            </div>
                        </div>
                    )) : <></>
                }
                
            </div>

        </>
    )
}

export default Notifications
