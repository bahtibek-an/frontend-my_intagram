import './Publications.css'
import photo from '../images/photo.png'
import likee from "../images/like.png";
import commentt from "../images/talk.png";
import cleare from "../images/cleare.png"
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './../../firebase.js'
import { v4 as uuidv4 } from 'uuid';
import Comments from '../post/Comments';
import Share from '../reels/Share';

const Posts = ({ setOpen, currentUser, users, getUsers, userName, id, dark }) => {

    const posts = currentUser && currentUser.publications


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
    }

    const like = async (user, publId, publication) => {
        const filteredPublications = user.publications.filter((publ) => {
            return publ.id !== publId
        })
        await setDoc(doc(db, "users", `${user.id}`), { ...user, publications: [...filteredPublications, { ...publication, likes: [...publication.likes, { from: userName, userId: id }] }] })
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

    const isLiked = (likes) => {
        if (likes && likes.length === 0) {
            setLiked(false)
        } else if (likes && likes.length === 1) {
            if (likes[0].userId === id) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        } else if (likes && likes.length > 1) {
            likes.forEach((like) => {
                if (like.userId === id) {
                    setLiked(true)
                } else {
                    setLiked(false)
                }
            })
        }
        getUsers()
    }

    const [commentsWindow, setCommentsWindow] = useState(false)
    const [comments, setComments] = useState(null)
    const [url, setUrl] = useState("")
    const [comment, setComment] = useState("")
    const [type, setType] = useState("")
    const [publ, setpubl] = useState(null)
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [shareWindow, setShareWindow] = useState(false)
    const [user, setUser] = useState()

    const addSave = (userId, url, publId) => {
        if (currentUser.saved.length === 0) {
            save(userId, url, publId)
        } else if (currentUser.saved.length === 1) {
            currentUser.saved[0].publId === publId ? unsave(publId) : save(userId, url, publId)
        } else if (currentUser.saved.length > 1) {
            const check = currentUser.saved.some((item) => {
                return item.publId === publId
            })
            check ? unsave(publId) : save(userId, url, publId)
        }

        getUsers()
    }

    const save = async (userId, url, publId) => {
        await setDoc(doc(db, "users", `${id}`), { ...currentUser, saved: [...currentUser.saved, { userId: userId, url: url, publId: publId }] })
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
        <>
            {posts && posts.length !== 0 ?
                <div className='flex posts'>
                    {posts && posts.map((post) => (
                        post.type === "video/mp4" ?
                            <div className='interesting_img' key={post.id}
                                onClick={() => {
                                    setComments(post.comments)
                                    setUrl(post.url)
                                    setType(post.type)
                                    setpubl(post)
                                    isLiked(post.likes)
                                    isSaved(post.id)
                                    setCommentsWindow(true)
                                    setUser(currentUser)
                                    console.log(comments)
                                }}>
                                <div className='video_div'>
                                    <video
                                        src={post.url}
                                        width="320px"
                                        height="320px"
                                    />
                                </div>
                                <div className='desc'>
                                    {post.likes.length !== 0 &&
                                        <div className='like_icon'>
                                            <img src={likee} alt="like" />
                                            <p style={{ marginRight: "20px" }}>{post.likes.length}</p>
                                        </div>}
                                    {post.comments.length !== 0 &&
                                        <div className='comment_icon'>
                                            <img src={commentt} alt="like" />
                                            <p>{post.comments.length}</p>
                                        </div>
                                    }
                                </div>
                            </div>

                            :

                            <div className='interesting_img' key={post.id}
                                onClick={() => {
                                    setComments(post.comments)
                                    setUrl(post.url)
                                    setType(post.type)
                                    setpubl(post)
                                    isLiked(post.likes)
                                    isSaved(post.id)
                                    setCommentsWindow(true)
                                    setUser(currentUser)
                                    console.log(comments)
                                }}>
                                <div><img src={post.url} alt="post" /></div>
                                <div className='desc'>
                                    {post.likes.length !== 0 &&
                                        <div className='like_icon'>
                                            <img src={likee} alt="like" />
                                            <p style={{ marginRight: "20px" }}>{post.likes.length}</p>
                                        </div>}
                                    {post.comments.length !== 0 &&
                                        <div className='comment_icon'>
                                            <img src={commentt} alt="like" />
                                            <p>{post.comments.length}</p>
                                        </div>
                                    }
                                </div>
                            </div>

                    ))}
                </div> :
                <div className='publications'>
                    <div className='p_img'>
                        <img src={photo} alt="foto" />
                    </div>
                    <h1>Share photo</h1>
                    <p>The photos you share will appear on your profile.</p>
                    <button onClick={() => { setOpen(true) }}>Share your first photo</button>
                </div>}

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
                <div className="Comments">
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
                    />
                </div>}
        </>

    )
}

export default Posts