import React, { useState } from 'react'
import './Comment.css'
import userr from '../images/user.png'
import commentuser from '../images/comment_user.png'
import smile from '../images/Smile_Image.png'
import GetDate from '../homePage/GetDate'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

const Comment = ({comments, user, userName, id, publ, publId, getUsers, dark}) => {

    const [newComment, setNewComment] = useState("")
   

    const addComment = (e) => {
        e.preventDefault()
        addcomment()
        setNewComment("")
        getUsers()
      }
    
      const addcomment = async () => {
        const filteredPublications = user.publications.filter((publi) => {
          return publi.id !== publId
        })
        await setDoc(doc(db, "users", `${user.id}`), { ...user, publications: [...filteredPublications, { ...publ, comments: [...publ.comments, { comment: newComment, id: uuidv4(), date: Date.now(), from: userName, userId: id }] }] })
      }
    
    return (
        <div className='comment_div fon'>
            <div className='header_comment'
            style={{backgroundColor: dark ? "#3f3f3f" : "", color:  dark ? "#fff" : ""}}>
                <h4>Comments</h4>
            </div>
            <div className='comments_users'
            style={{backgroundColor: dark ? "#3f3f3f" : "", color:  dark ? "#fff" : ""}}>

                {comments && 
                comments.map((comment)=>(
                   <div className='commentUser'>
                    <div>
                        <img src={user.profile ? user.profile : userr} alt="user" width="32" height="32"/>
                        <div>
                            <div className='flex'>
                                <p><b>{comment.from} </b></p>
                                <GetDate date={comment.date}/>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                </div> 
                ))
                }

            </div>
            <div className='add_comment'
            style={{backgroundColor: dark ? "#3f3f3f" : "", color:  dark ? "#fff" : ""}}>
                <div>
                    <img src={commentuser} alt="user" width="32" />
                    <form onSubmit={
                        addComment
                        }>
                      <input type="text" placeholder='Add a comment...' onChange={(e)=>setNewComment(e.target.value)} value={newComment} 
                      style={{backgroundColor: dark ? "#3f3f3f" : "", color:  dark ? "#fff" : ""}}/>  
                    </form>
                    <img src={smile} alt="smile" width="24" />
                </div>
            </div>
        </div>
    )
}


export default Comment
