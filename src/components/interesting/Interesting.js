import './Interesting.css'
import likee from "../images/like.png";
import commentt from "../images/talk.png";
import cleare from "../images/cleare.png"
import { useState } from 'react';
import Comments from '../post/Comments';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import Share from '../reels/Share';


const Interesting = ({ users, getUsers, userName, id, currentUser, dark }) => {


  const [commentsWindow, setCommentsWindow] = useState(false)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState(null)
  const [url, setUrl] = useState("")
  const [comment, setComment] = useState("")
  const [type, setType] = useState("")
  const [publ, setpubl] = useState(null)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [shareWindow, setShareWindow] = useState(false)


  const addComment = (user, publId, publication, comment) => {
    addcomment(user, publId, publication, comment)
    setComment("")
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
    getUsers()
  }

  const like = async (user, publId, publication) => {
    const filteredPublications = user.publications.filter((publ) => {
      return publ.id !== publId
    })
    await setDoc(doc(db, "users", `${id}`), { ...user, publications: [...filteredPublications, { ...publication, likes: [...publication.likes, { from: userName, userId: id }] }] })
  }

  const dislike = async (user, publId, publication) => {
    const filteredPublications = user.publications.filter((publ) => {
      return publ.id !== publId
    })
    const filteredlikes = publication.likes.filter((like) => {
      return like.userId !== id
    })
    await setDoc(doc(db, "users", `${user.id}`), { ...user, publications: [...filteredPublications, { ...publication, likes: [...filteredlikes] }] })
  }

  const isLiked = (publ) => {
    if (publ.likes && publ.likes.length === 0) {
      setLiked(false)
    } else if (publ.likes && publ.likes.length === 1) {
      if (publ.likes[0].userId === id) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    } else if (publ.likes && publ.likes.length > 1) {
      publ.likes.forEach((like) => {
        if (like.userId === id) {
          setLiked(true)
        } else {
          setLiked(false)
        }
      })
    }
    getUsers()
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

    getUsers()
  }

  const save = async (userId, url, publ) => {
    await setDoc(doc(db, "users", `${id}`), { ...currentUser, saved: [...currentUser.saved, { userId: userId, url: url, publId: publ.id, type: publ.type }] })
  }

  const unsave = async (checkId) => {
    const filteredSaved = currentUser.saved.filter((item) => {
      return item.publId !== checkId
    })
    await setDoc(doc(db, "users", `${id}`), { ...currentUser, saved: [...filteredSaved] })
  }

  const isSaved = (publId) => {
    if (currentUser && currentUser.saved.length === 0) {
      setSaved(false)
    } else if (currentUser && currentUser.saved.length === 1) {
      currentUser.saved[0].publId === publId ? setSaved(true) : setSaved(false)
    } else if (currentUser && currentUser.saved.length > 1) {
      const filteredSaved = currentUser.saved.some((item) => {
        return item.publId === publId
      })
      filteredSaved ? setSaved(true) : setSaved(false)
    }
  }




  return (
    <div className='interesting'
      style={{ backgroundColor: dark ? "#000" : " #fff" }}>
      <div className='int_search_area'>
        <div className='int_search'>
          <input type="text" placeholder='Search' />
          <button>
            <img src={cleare} alt="search" />
          </button>
        </div>
      </div>
      <div>

        <div className='flex'>
          {users && users.map((user) => (
            user.publications[0] ?
              <>
                {user.publications.length > 1 ?
                  user.publications.map((publ) => (
                    publ.type !== "video/mp4" &&
                    <div className='interesting_img' key={publ.id}
                      onClick={() => {
                        setCommentsWindow(true)
                        setUser(user)
                        setComments(publ.comments)
                        setUrl(publ.url)
                        setType(publ.type)
                        setpubl(publ)
                        isLiked(publ)
                        isSaved(publ.id)
                      }}>
                      <div><img src={publ.url} /></div>
                      <div className='desc'>
                        {publ.likes.length !== 0 &&
                          <div className='like_icon'>
                            <img src={likee} alt="like" />
                            <p style={{ marginRight: "20px" }}>{publ.likes.length}</p>
                          </div>}
                        {publ.comments.length !== 0 &&
                          <div className='comment_icon'>
                            <img src={commentt} alt="like" />
                            <p>{publ.comments.length}</p>
                          </div>
                        }
                      </div>
                    </div>
                  ))
                  : user.publications[0].type !== "video/mp4" &&
                  <div className='interesting_img' key={user.publications[0].id}
                    onClick={() => {
                      setCommentsWindow(true)
                      setUser(user)
                      setComments(user.publications[0].comments)
                      setUrl(user.publications[0].url)
                      setType(user.publications[0].type)
                      setpubl(user.publications[0])
                      isLiked(user.publications[0])
                      isSaved(user.publications[0].id)
                    }}>
                    <div><img src={user.publications[0].url}
                    /></div>
                    <div className='desc'>
                      {user.publications[0].likes.length !== 0 &&
                        <div className='like_icon'>
                          <img src={likee} alt="like" />
                          <p style={{ marginRight: "20px" }}>{user.publications[0].likes.length}</p>
                        </div>}
                      {user.publications[0].comments.length !== 0 &&
                        <div className='comment_icon'>
                          <img src={commentt} alt="like" />
                          <p>{user.publications[0].comments.length}</p>
                        </div>}
                    </div>
                  </div>}
              </> : <></>
          ))}
        </div>


      </div>
      {commentsWindow &&
        <div className="Comments">
          <img src={cleare} alt="cleare"
            onClick={() => setCommentsWindow(false)} />
          <Comments
            users={users}
            user={user}
            comments={comments}
            url={url}
            addComment={addComment}
            comment={comment}
            setComment={setComment}
            type={type}
            publ={publ}
            addlike={addlike}
            liked={liked}
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

    </div>
  )
}

export default Interesting

