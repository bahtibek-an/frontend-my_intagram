
import GetDate from '../homePage/GetDate'
import './Post.css'
import statusimg from "../images/user.png";
import love from "../images/love.svg";
import loveRed from "../images/like_red.png";
import coment from "../images/comment.svg";
import share from "../images/share.svg";
import savee from "../images/save.png";
import saveBlack from "../images/save_black.png";
import hWhite from "../images/hWhite.jpg";
import cWhite from "../images/cWhite.jpg";
import sWhite from "../images/comW.jpg";
import plane from "../images/plane.jpg";
import dots from "../images/dots.jpg";
import saveWhite from "../images/sBlackW.jpg";
import more from "../images/more.webp"
import { useState } from 'react';

const Comments = ({ users, user, comments, url, addComment, comment, setComment, type, publ,
    addlike, liked, saved, addSave, setShareWindow, setUrl, setType, dark, id, setDeleteWin }) => {


    const [islike, setislike] = useState(liked)
    const [likes, setLikes] = useState(publ && publ.likes.length)
    const [save, setSave] = useState(saved)
    const [muted, setMuted] = useState(true)

    const isSave = () => {
        save ? setSave(false) : setSave(true)

    }


    const isliked = () => {
        islike ? setislike(false) : setislike(true)
        islike ? setLikes(likes - 1) : setLikes(likes + 1)
    }


    return (
        <div className='div_com'
        style={{ backgroundColor: dark ? "#000" : "#fff" }}>
            {type === "video/mp4" ?
                <video style={{ maxWidth: "800px", maxHeight: "800px" }}
                    src={url}
                    loop={true}
                    autoPlay={true}
                    muted={muted}
                    onClick={() => {
                        muted ? setMuted(false) : setMuted(true)
                    }} />
                :
                <div style={{ maxWidth: "800px", maxHeight: "800px" }}>
                    <img style={{ width: "100%", height: "100%" }} src={url} alt="img" />
                </div>
            }

            <div className='comments_div' style={{ backgroundColor: dark ? "#000" : "#fff" }}>
                <div className="comment_user-">
                    <div>
                        <img className='post_image user_round' src={user.profil ? user.profil : statusimg} alt="" />
                        <p><b>{user.username}</b></p>
                    </div>
                    {user.id === id  && <img src={dark ? dots : more} alt="more" width="20" 
                    onClick={()=>setDeleteWin(true)}/>}
                </div>
                <div className='comment_scr'>
                    {comments.length !== 0 && comments.map((comment) => (
                        <div>
                            <div className="comment_user">
                                {users.map((user) => (
                                    user.id === comment.userId ?
                                        <img className='post_image user_round' src={user.profil ? user.profil : statusimg} alt="" />
                                        : <></>
                                ))}
                                <p><b>{comment.from}:</b></p>
                                <GetDate date={comment.date} />
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                </div>
                <div className='bottom'>
                    <div className='form_div'>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
                            <div>
                                {dark ?
                                    <img src={islike ? loveRed : hWhite} className="post_reactimage" alt="post"
                                        onClick={() => {
                                            addlike(user, publ.id, publ)
                                            isliked()
                                        }} /> :
                                    <img src={islike ? loveRed : love} className="post_reactimage" alt="post"
                                        onClick={() => {
                                            addlike(user, publ.id, publ)
                                            isliked()
                                        }} />}
                                <img src={dark ? cWhite : coment} className="post_reactimage" alt="post" />
                                <img src={dark ? plane : share} className="post_reactimage" alt="post"
                                    onClick={() => {
                                        setUrl(url)
                                        setType(type)
                                        setShareWindow(true)
                                    }} />
                            </div>
                            <div style={{ paddingRight: "10px" }}>
                                {dark ? <img src={save ? saveWhite : sWhite} className="post_saveimage" alt="save"
                                    onClick={() => {
                                        addSave(user.id, publ.url, publ)
                                        isSave()
                                    }} /> :
                                    <img src={save ? saveBlack : savee} className="post_saveimage" alt="save"
                                        onClick={() => {
                                            addSave(user.id, publ.url, publ)
                                            isSave()
                                        }} />}
                            </div>
                        </div>
                    </div>
                    <p><b>{likes !== 0 && `${likes} likes`}</b></p>
                    <div className='form_div'>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            addComment(user, publ.id, publ, comment)
                        }}>
                            <input type="text" placeholder='Add a comment...'
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                style={{ color: dark ? "#fff" : "#000" }} />
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Comments