import "./style.css";
import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import Skeleton from "react-loading-skeleton";

const UserPhotoModal = React.lazy(() => import("./UserPhotoModal"));

const Photos = ({ photos }) => {
    const [ post, setPost ] = useState({});
    const [open, setOpen] = React.useState(false);

    const handleOpen = (postItem) => {
        setPost(postItem);
        setOpen(true)
    };

    return (
        <>
            <Modal className="modals" open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <UserPhotoModal setOpen={setOpen} photo={post} />
            </Modal>
            <div className="d-flex justify-content-center align-items-center">
                {!photos || (photos.length === 0 && (
                    <>
                        <div class="alert alert-primary d-flex align-items-center alert-dismissible fade show w-75" role="alert">
                            <svg style={{width: "30px"}} xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <div>
                                No Posts Yet
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </>
                ))}
            </div>
            <div className="user-post mt-2 row row-cols-1 row-cols-md-3 g-4 mb-4 ms-2">
                {!photos ? (<><Skeleton count={12} width={320} height={400}/></>) : photos.length > 0 ?  (
                    photos.map((photo) => (
                        <>
                            <div class="col" key={photo.docId} role="button"s>
                                <div class="card" onClick={() => handleOpen(photo)}>
                                    <img src={photo.imageSrc} class="img-fluid" alt={photo.caption} />
                                    <div class="card-body">
                                        <div className="d-flex">
                                            <div className="likes ms-2 d-flex align-items-center">
                                                <span role="button" className="fs-4 mt-2"><span><ion-icon name="heart-outline"></ion-icon></span></span>
                                                <span className="ms-1">{photo.likes.length}</span>
                                            </div>
                                            <div className="comments ms-2 d-flex align-items-center">
                                                <span role="button" className="fs-4 mt-2"><span><ion-icon name="chatbubble-ellipses-outline"></ion-icon></span></span>
                                                <span className="ms-1">{photo.comments.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                ) : (null)}
            </div>
        </>
    );
};

export default Photos;