
import './Reels.css'
import MyVideo from './MyVideo'
import More from './More'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useState } from 'react';



const Reels = ({ users, getUsers, userName, id, currentUser, dark }) => {

  const [muted, setMuted] = useState(true)

  const [more, setMore] = useState(false)

  const open = () => {
    more ? setMore(false) : setMore(true)
  }

  const filteredUsers = users && users.filter((user) => {
    return user.publications[0]
  })

  const isLiked = (publ) => {
    let liked
    if (publ.likes && publ.likes.length === 0) {
        liked = false
    } else if (publ.likes && publ.likes.length === 1) {
        if (publ.likes[0].userId === id) {
            liked = true
        } else {
          liked = false
        }
    } else if (publ.likes && publ.likes.length > 1) {
        publ.likes.forEach((like) => {
            if (like.userId === id) {
                liked = true
            } else {
              liked = false
            }
        })
    }
    return liked
}

const addSave = (userId, url, publ) => {
  if (currentUser.saved.length === 0) {
    save(userId, url, publ)
  } else if (currentUser.saved.length === 1) {
    currentUser.saved[0].publId === publ.id ? unsave(publ.id) : save(userId, url, publ)
  } else if (currentUser.saved.length > 1) {
    const check = currentUser.saved.some((item) => {
      return item.publId === publ.id
    })
    check ? unsave(publ.id) : save(userId, url, publ)
  }
  isSaved(publ.id)
}

const save = async (userId, url, publ) => {
  await setDoc(doc(db, "users", `${id}`), { ...currentUser, saved: [...currentUser.saved, { userId: userId, url: url, publId: publ.id }] })
  getUsers()
}

const unsave = async (checkId) => {
  const filteredSaved = currentUser.saved.filter((item) => {
    return item.publId !== checkId
  })
  await setDoc(doc(db, "users", `${id}`), { ...currentUser, saved: [...filteredSaved] })
  getUsers()
}

const isSaved = (publId) => {
  let check

  if (currentUser && currentUser.saved.length === 0) {
    check = false
  } else if (currentUser && currentUser.saved.length === 1) {
    currentUser.saved[0].publId === publId ? check = true : check = false
  } else if (currentUser && currentUser.saved.length > 1) {
    const filteredSaved = currentUser.saved.some((item) => {
      return item.publId === publId
    })
    filteredSaved ? check = true : check = false
  }
  return check
}

const subscribe = (userId, user) => {
  const check = currentUser.following.some((subscribe)=> {
    return subscribe.userId === userId
  })
  if(check){
    cancelFollowing(userId)
    cancelFollowers(userId, user)
  }else{
    following(userId)
    follower(userId, user)
  }
}


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

const isSubscribe = (userId) => {
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

  return (
    <div className='reels'>

      {filteredUsers && filteredUsers.map((user) => (
        user.publications.length > 1 ?
          user.publications.map((publ) => (
            publ.type !== "image/jpeg" &&
            <MyVideo
              url={publ.url}
              urlType={publ.type}
              open={open}
              likes={publ.likes.length}
              comments={publ.comments}
              user={user}
              userName={userName}
              id={id}
              publ={publ}
              publId={publ.id}
              getUsers={getUsers}
              liked = {isLiked(publ)}
              saved={isSaved(publ.id)}
              addSave={addSave}
              subscribe = {subscribe}
              isSubscribe={isSubscribe(user.id)}
              muted={muted}
              setMuted={setMuted}
              users={users}
              currentUser={currentUser}
              dark={dark}
            />
          )) : user.publications[0].type !== "image/jpeg" &&
          <MyVideo
            url={user.publications[0].url}
            urlType={user.publications[0].type}
            open={open}
            likes={user.publications[0].likes.length}
            comments={user.publications[0].comments}
            user={user}
            userName={userName}
            id={id}
            publ={user.publications[0]}
            publId={user.publications[0].id}
            getUsers={getUsers}
            liked = {isLiked(user.publications[0])}
            saved={isSaved(user.publications[0].id)}
            addSave={addSave} 
            subscribe = {subscribe}
            isSubscribe={isSubscribe(user.id)}
            muted={muted}
            setMuted={setMuted}
            users={users}
            currentUser={currentUser}
            dark={dark}/>
      ))}

      {more && <More dark={dark}/>}
    </div>
  )
}


export default Reels