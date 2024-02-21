import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import UseComment from '../hooks/UseComment';
import { Link } from 'react-router-dom';
const CommentModal = ({ setShow, show,token ,item,user}) => {
    const {addComment} = UseComment();
    const handleClose = () => setShow(false);
    const [comments, setComments] = useState([]);
    const [text,setText] = useState("");

    useEffect(() => {
        const headers = {
            Authorization:token
        }
        axios
            .get(`https://instagram-server-6onu.onrender.com/post/comment/${item._id}`, { headers })
            .then((res) => {
                console.log("comments",res);
                setComments(res.data);
            }).catch((e) => {
                console.log(e);
            })
    }, [comments])  

    const handleSumbit = (item) => {
        addComment({item,token,text})
    }
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"   
        >
            <Modal.Header className='bg-black'>
                <Modal.Title style={{ color: 'white' }}>
                    Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-black'>
                <div className="comments_container">
                {
                    comments.map((comment) => {
                        return (
                            <>
                                <Link to={user._id === comment.user._id ? `/user/profile/${token}` :`/users/profile/${token}/${comment.user._id}`} key={comment.user._id} className="comment d-flex flex-column" style={{ width: '300px', padding: '10px',textDecoration:"none" }}>
                                    <div className="user_info d-flex gap-1 text-center" style={{ alignItems: 'center' }}>
                                        <img width={'30px'} height={'30px'} style={{ borderRadius: '100%', marginRight: '10px' }} src={`https://instagram-server-6onu.onrender.com/avatar/image/${comment.user._id}`} alt="" />
                                        <span style={{ color: 'white', fontWeight: '700' }}>
                                            {
                                                comment.user.name
                                            }
                                        </span>
                                        <span style={{ fontSize: '14px', color: 'white', marginLeft: '10px' }}>{comment.comment}</span>
                                    </div>
                                </Link>

                            </>
                        )
                    })
                }

                </div>
                <Modal.Footer className='d-flex' style={{ height: '40px' }}>
                    <Form.Control placeholder='Enter comment' style={{ width: '300px', height: "30px" }} onChange={(e) => setText(e.target.value)}/>
                    <Button type='submit' style={{ height: '30px', display: 'flex', alignItems: 'center' }} onClick={() => handleSumbit(item)}>Sumbit</Button>
                </Modal.Footer>
            </Modal.Body>
            <Modal.Footer className='bg-black'>
                <Button variant='danger' onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CommentModal