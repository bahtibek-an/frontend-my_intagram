import React from 'react';
import Modal from 'react-bootstrap/Modal';
const Comments = ({ comments, show, handleClose, handleShow }) => {
  return (
    <Modal show={show} onHide={handleClose} centered scrollable keyboard dialogClassName='modal-container'>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comments?.map((c) => (
          <div className='d-flex align-items-center gap-1'>
            <p className='fw-medium'>{c.username}:</p>
            <p>{c.comment}</p>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default Comments;
