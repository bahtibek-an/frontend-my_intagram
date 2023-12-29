import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";

const AddComment = React.lazy(() => import("./AddComment"));

const style = {
    position: 'absolute',
    width: '800px',
    height:'90%',
    borderRadius: '40px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const Comments = ({ docId, comments: allComments, commentInput }) => {
    const portal = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [ comments, setComments ] = useState(allComments);

    return (
        <>
            <div className="home-comment">
                { comments.length >= (1) && (
                    <>
                        <p role="button" onClick={handleOpen} className="text-muted mt-1" style={{fontSize: "17px"}}>View all {comments.length} comments</p>
                        <Modal className="modals" open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            <div style={style} className="container bg-dark p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="text">
                                        <h5>Comments</h5>
                                    </div>
                                    <div className="close">
                                        <button className="btn btn-primary d-flex justify-content-center fs-3" onClick={() => setOpen(false)}><ion-icon name="close-outline"></ion-icon></button>
                                    </div>
                                </div>
                                <hr style={{width: "800px", marginLeft: "-20px"}} />
                                <div className="overflow-auto" style={{height: "60%"}}>
                                    { comments.slice(0).map((item) => (
                                        <>
                                            <div key={`${item.comment}-${item.displayName}`} className="d-flex align-items-center">
                                                <div className="username">
                                                    <p className="card-title fs-5 ms-3 text-decoration-underline" role="button" onClick={() => portal(`/${item.displayName}`)}>{item.displayName}</p>
                                                    <i style={{fontSize: "18px"}} className="ms-5">{item.comment}</i>
                                                </div>
                                            </div>
                                        </>
                                    )) }
                                </div>
                                <div className="fixe p-4">
                                    <hr style={{width: "800px", marginLeft: "-50px"}} />
                                    <AddComment docId={docId} comments={comments} setComments={setComments} commentInput={commentInput}/>
                                </div>
                            </div>
                        </Modal>
                    </>
                ) }
                {comments.slice(0, 1).map((item) => (
                    <>
                        <div style={{marginTop: "-15px"}} key={`${item.comment}-${item.displayName}`} className="d-flex align-items-center">
                            <div className="username">
                                <p className="card-title fs-5" role="button" onClick={() => portal(`/${item.displayName}`)}>{item.displayName}<i style={{fontSize: "18px"}} className="ms-3">{item.comment}</i></p>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <AddComment docId={docId} comments={comments} setComments={setComments} commentInput={commentInput}/>
        </>
    );
};

export default Comments;