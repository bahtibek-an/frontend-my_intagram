import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const PostModal = ({ show, onHide, handleSubmit, handleImageChange, description, setDescription }) => {
  return (
    <Modal show={show} onHide={onHide} keyboard aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title className='fs-5' id='contained-modal-title-vcenter'>
          Create Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Control type='file' accept='image/*' onChange={handleImageChange} />
          </Form.Group>
          <Form.Group controlId='formDescription' className='mb-3'>
            <Form.Control
              as='textarea'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder='Enter a description of the image'
              rows={3}
              autoFocus
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Upload
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
