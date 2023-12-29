import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddComment = React.lazy(() => import("../AddComment"));

const style = {
  position: 'absolute',
  width: '800px',
  height:'90%',
  borderRadius: '40px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const HomePostComment = ({ docId, comments: allComments, commentInput }) => {
  const portal = useNavigate();
  const handleClose = () => setOpen(true);
  const [setOpen] = React.useState(false);
  const [ comments, setComments ] = useState(allComments);

  return (
    <>
      <div style={style} className="container bg-dark p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text">
            <h5>Comments</h5>
          </div>
          <div className="close">
            <p className="btn btn-primary d-flex justify-content-center fs-3" onClose={handleClose}><ion-icon name="close-outline"></ion-icon></p>
          </div>
        </div>
        <hr style={{width: "800px", marginLeft: "-20px"}} />
        {comments.splice().map((item) => (
          <>
            <div style={{marginTop: "-15px"}} key={`${item.comment}-${item.displayName}`} className="d-flex align-items-center">
              <div className="username">
                <p className="card-title fs-5" role="button" onClick={() => portal(`/${item.displayName}`)}>{item.displayName}<i style={{fontSize: "18px"}} className="ms-3">{item.comment}</i></p>
              </div>
            </div>
          </>
        ))}
        <div className="fixed-bottom p-4">
          <hr style={{width: "800px", marginLeft: "-30px"}} />
          <AddComment docId={docId} comments={comments} setComments={setComments} commentInput={commentInput}/>
        </div>
      </div>
    </>
  );
};

export default HomePostComment;