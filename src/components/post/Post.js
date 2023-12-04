
import './Post.css'
import GetDate from '../homePage/GetDate';
import love from "../images/love.svg";
import loveRed from "../images/like_red.png";
import hWhite from "../images/hWhite.jpg";
import coment from "../images/comment.svg";
import cWhite from "../images/cWhite.jpg";
import share from "../images/share.svg";
import plane from "../images/plane.jpg";
import savee from "../images/save.png";
import sWhite from "../images/comW.jpg";
import saveBlack from "../images/save_black.png";
import saveWhite from "../images/sBlackW.jpg";
import smile from "../images/smile.png";
import statusimg from "../images/user.png";
import Recommend from '../recommend/Recommend';
import { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import Comments from './Comments';
import cleare from '../images/cleare.png'
import Player from "./Player"
import Share from '../reels/Share';
import Form from './Form';



const Post = ({ users, id, userName, getUsers, currentUser, newPublication, dark }) => {

  const [comment, setComment] = useState("")
  const [commentsWindow, setCommentsWindow] = useState(false)
  const [comments, setComments] = useState([])
  const [url, setUrl] = useState("")
  const [usern, setUsern] = useState("")
  const [type, setType] = useState("")
  const [publ, setPubl] = useState(null)
  const [saved, setSaved] = useState(false)
  const [muted, setMuted] = useState(true)
  const [shareWindow, setShareWindow] = useState(false)


  const unmuted = () => {
    muted ? setMuted(false) : setMuted(true)
  }


  const addComment = (user, publId, publication, comment) => {
    addcomment(user, publId, publication, comment)
    getUsers()
  }

  const addcomment = async (user, publId, publication, comment) => {
    const filteredPublications = user.publications.filter((publ) => {
      return publ.id !== publId
    })
    await setDoc(doc(db, "users", `${user.id}`), { ...user, publications: [...filteredPublications, { ...publication, comments: [...publication.comments, { comment: comment, id: uuidv4(), date: Date.now(), from: userName, userId: id }] }] })
    getUsers()
  }

  const addlike = (user, publId, publication) => {

    if (publication.likes.length === 0) {
      like(user, publId, publication)
    } else if (publication.likes.length === 1) {
      publication.likes[0].userId === id ? dislike(user, publId, publication) : like(user, publId, publication)
    } else if (publication.likes.length > 1) {
      const check = publication.likes.some((like) => {
        return like.userId === id
      })
      check ? dislike(user, publId, publication) : like(user, publId, publication)
    }
  }

  const like = async (user, publId, publication) => {
    const filteredPublications = user.publications.filter((publ) => {
      return publ.id !== publId
    })
    await setDoc(doc(db, "users", `${user.id}`), { ...user, publications: [...filteredPublications, { ...publication, likes: [...publication.likes, { from: userName, userId: id }] }] })
    getUsers()
  }

  const dislike = async (user, publId, publication) => {
    const filteredPublications = user.publications.filter((publ) => {
      return publ.id !== publId
    })
    const filteredlikes = publication.likes.filter((like) => {
      return like.userId !== id
    })
    await setDoc(doc(db, "users", `${user.id}`), { ...user, publications: [...filteredPublications, { ...publication, likes: [...filteredlikes] }] })
    getUsers()
  }

  const loves = (publ) => {
    let check;
    if (publ.likes && publ.likes.length === 0) {
      check = "dislike"
    } else if (publ.likes && publ.likes.length === 1) {
      if (publ.likes[0].userId === id) {
        check = "like"
      } else {
        check = "dislike"
      }
    } else if (publ.likes && publ.likes.length > 1) {
      publ.likes.forEach((like) => {
        if (like.userId === id) {
          check = "like"
        } else {
          check = "dislike"
        }
      })
    }

    return check
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
    await setDoc(doc(db, "users", `${id}`), { ...currentUser, saved: [...currentUser.saved, { userId: userId, url: url, publId: publ.id, type: publ.type }] })
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
    const check = currentUser.following.some((subscribe) => {
      return subscribe.userId === userId
    })
    if (check) {
      cancelFollowing(userId)
      cancelFollowers(userId, user)
    } else {
      following(userId)
      follower(userId, user)
    }
  }


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

  const follower = async (userId, user) => {
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



  return (
    <>

      <div className='post_container'>

        {newPublication &&
          <div key={newPublication.id}>
            <div className='post_header'>
              <img className='post_image user_round' src={currentUser.profile ? currentUser.profile : statusimg} alt="user" />
              <p className='post_userName'>{newPublication.username}</p>
              <GetDate date={newPublication.publications[newPublication.publications.length - 1].date} />
            </div>
            <div className='post_img_div'>

              {newPublication.publications[newPublication.publications.length - 1].type === "video/mp4" ?
                <Player
                  url={newPublication.publications[newPublication.publications.length - 1].url}
                  key={newPublication.publications[newPublication.publications.length - 1].id}
                  muted={muted}
                  unmuted={unmuted}
                />
                :
                <img src={newPublication.publications[newPublication.publications.length - 1].url}
                  key={newPublication.publications[newPublication.publications.length - 1].id} alt="save" width="468" />
              }

            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
              <div>

                {dark ?
                  <img src={loves(newPublication.publications[newPublication.publications.length - 1]) === "like" ? loveRed : love} className="post_reactimage" alt="post"
                    onClick={() => {
                      addlike(newPublication, newPublication.publications[newPublication.publications.length - 1].id, newPublication.publications[newPublication.publications.length - 1])
                      loves(newPublication.publications[newPublication.publications.length - 1])
                    }} /> :
                  <img src={loves(newPublication.publications[newPublication.publications.length - 1]) === "like" ? loveRed : hWhite} className="post_reactimage" alt="post"
                    onClick={() => {
                      addlike(newPublication, newPublication.publications[newPublication.publications.length - 1].id, newPublication.publications[newPublication.publications.length - 1])
                      loves(newPublication.publications[newPublication.publications.length - 1])
                    }} />}

                <img src={dark ? cWhite : coment} className="post_reactimage" alt="post"
                  onClick={() => {
                    setCommentsWindow(true)
                    setComments(newPublication.publications[newPublication.publications.length - 1].comments)
                    setUrl(newPublication.publications[newPublication.publications.length - 1].url)
                    setUsern(newPublication)
                    setType(newPublication.publications[newPublication.publications.length - 1].type)
                  }} />
                <img src={dark ? plane : share} className="post_reactimage" alt="post" />
              </div>
              <div>
                {dark ?
                  <img src={isSaved(newPublication.publications[newPublication.publications.length - 1].id) ? saveWhite : sWhite} className="post_saveimage" alt="save"
                    onClick={() => {
                      addSave(newPublication.id, newPublication.publications[newPublication.publications.length - 1].url, newPublication.publications[newPublication.publications.length - 1].id)
                      isSaved(newPublication.publications[newPublication.publications.length - 1].id)
                    }} /> :
                  <img src={isSaved(newPublication.publications[newPublication.publications.length - 1].id) ? saveBlack : savee} className="post_saveimage" alt="save"
                    onClick={() => {
                      addSave(newPublication.id, newPublication.publications[newPublication.publications.length - 1].url, newPublication.publications[newPublication.publications.length - 1].id)
                      isSaved(newPublication.publications[newPublication.publications.length - 1].id)
                    }} />
                }
              </div>
            </div>
            <div className='likes'>
              {newPublication.publications[newPublication.publications.length - 1].likes.length} likes
            </div>
            <div className='comments'>
              <button onClick={() => {
                setCommentsWindow(true)
                setComments(newPublication.publications[newPublication.publications.length - 1].comments)
                setUrl(newPublication.publications[newPublication.publications.length - 1].url)
                setUsern(newPublication)
                setType(newPublication.publications[newPublication.publications.length - 1].type)
              }}>View all comments</button>
            </div>
            {commentsWindow &&
              <div className="Comments">
                <img src={cleare} alt="cleare"
                  onClick={() => setCommentsWindow(false)} />
                <Comments users={users} user={usern} comments={comments} url={url} addComment={addComment} comment={comment} setComment={setComment}
                  type={type} publ={publ} currentUser={currentUser} getUsers={getUsers} userName={userName} saved={saved} />
              </div>}
            <div className='comment'>
              <form onSubmit={(e) => {
                e.preventDefault()
                addComment(newPublication, newPublication.publications[newPublication.publications.length - 1].id, newPublication.publications[newPublication.publications.length - 1], comment)
              }}>
                <input type="text" placeholder='Add a comment...'
                  onChange={(e) => setComment(e.target.value)}
                  value={comment} />
              </form>
              <img src={smile} width="13" alt="post" />
            </div>
          </div>
        }


        <Recommend dark={dark} users={users} currentUser={currentUser} id={id} subscribe={following} />


        {users.length > 1 ? users.map((user) => (
          user.publications[0] ?
            <div key={user.id}>
              <div className='post_header'>
                <img className='post_image user_round' src={user.profile ? user.profile : statusimg} alt="user" />
                <p className='post_userName'>{user.username}</p>
                <GetDate date={user.publications[user.publications.length - 1].date} />
                <button onClick={() => { subscribe(user.id, user) }}>{!isFollowing(user.id) ? "Follow" : "Unfollow"}</button>
              </div>
              <div className='post_img_div'>

                {user.publications[user.publications.length - 1].type === "video/mp4" ?
                  <Player
                    url={user.publications[user.publications.length - 1].url}
                    key={user.publications[user.publications.length - 1].id}
                    muted={muted}
                    unmuted={unmuted} />
                  :
                  <img src={user.publications[user.publications.length - 1].url}
                    key={user.publications[user.publications.length - 1].id} alt="save" width="468" />}

              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", maxWidth: "470px" }}>
                <div>
                  {
                    dark ?
                      <img src={loves(user.publications[user.publications.length - 1]) === "like" ? loveRed : hWhite} className="post_reactimage" alt="post"
                        onClick={() => {
                          addlike(user, user.publications[user.publications.length - 1].id, user.publications[user.publications.length - 1])
                          loves(user.publications[user.publications.length - 1])
                        }} /> :
                      <img src={loves(user.publications[user.publications.length - 1]) === "like" ? loveRed : love} className="post_reactimage" alt="post"
                        onClick={() => {
                          addlike(user, user.publications[user.publications.length - 1].id, user.publications[user.publications.length - 1])
                          loves(user.publications[user.publications.length - 1])
                        }} />
                  }


                  <img src={dark ? cWhite : coment} className="post_reactimage" alt="post"
                    onClick={() => {
                      setCommentsWindow(true)
                      setComments(user.publications[user.publications.length - 1].comments)
                      setUrl(user.publications[user.publications.length - 1].url)
                      setUsern(user)
                      setType(user.publications[user.publications.length - 1].type)
                      setPubl(user.publications[user.publications.length - 1])
                      setSaved(user.publications[user.publications.length - 1].id)
                    }} />
                  <img src={dark ? plane : share} className="post_reactimage" alt="post"
                    onClick={() => {
                      setShareWindow(true)
                      setUrl(user.publications[user.publications.length - 1].url)
                      setType(user.publications[user.publications.length - 1].type)
                    }} />
                </div>
                <div>
                  {dark ?
                    <img src={isSaved(user.publications[user.publications.length - 1].id) ? saveWhite : sWhite} className="post_saveimage" alt="save"
                      onClick={() => {
                        addSave(user.id, user.publications[user.publications.length - 1].url, user.publications[user.publications.length - 1])
                      }} /> :
                    <img src={isSaved(user.publications[user.publications.length - 1].id) ? saveBlack : savee} className="post_saveimage" alt="save"
                      onClick={() => {
                        addSave(user.id, user.publications[user.publications.length - 1].url, user.publications[user.publications.length - 1])
                      }} />}
                </div>
              </div>
              <div className='likes'>
                {user.publications[user.publications.length - 1].likes.length} likes
              </div>
              <div className='comments'>
                <button onClick={() => {
                  setCommentsWindow(true)
                  setComments(user.publications[user.publications.length - 1].comments)
                  setUrl(user.publications[user.publications.length - 1].url)
                  setUsern(user)
                  setType(user.publications[user.publications.length - 1].type)
                  setPubl(user.publications[user.publications.length - 1])
                  setSaved(user.publications[user.publications.length - 1].id)
                }}>View all comments</button>
              </div>
              {commentsWindow &&
                <div className="Comments">
                  <img src={cleare} alt="cleare"
                    onClick={() => setCommentsWindow(false)} />
                  <Comments
                    id={id}
                    users={users}
                    user={usern}
                    comments={comments}
                    url={url}
                    addComment={addComment}
                    comment={comment}
                    setComment={setComment}
                    type={type}
                    publ={publ}
                    currentUser={currentUser}
                    getUsers={getUsers}
                    userName={userName}
                    saved={saved}
                    addSave={addSave}
                    setShareWindow={setShareWindow}
                    setUrl={setUrl}
                    setType={setType}
                    dark={dark} />
                </div>}

              {shareWindow &&
                <div className="Comments Share">
                  <img src={cleare} alt="cleare"
                    onClick={() => setShareWindow(false)} />
                  <Share
                    id={id}
                    users={users}
                    url={url}
                    urlType={type}
                    currentUser={currentUser}
                    getUsers={getUsers}
                    position={"relative"}
                    dark={dark}
                  />
                </div>}

              <div className='comment'>

                <Form
                  user={user}
                  userid={user.publications[user.publications.length - 1].id}
                  publ={user.publications[user.publications.length - 1]}
                  addComment={addComment}
                  dark={dark}
                />

                <img src={smile} width="13" alt="post" />
              </div>
            </div> : <></>
        )) : <></>}

      </div>

    </>
  )
}

export default Post