import React , {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import UsePost from '../hooks/UsePost';
const PostCreateModal = ({show,setShow,token}) => {
    const {post} = UsePost();
    // const [show, setShow] = useState(false);
    const [title,setTitle] = useState("")
    const [file,setFile] = useState(null)
    const handleClose = () => setShow(false);
    const handleSumbit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file',file);
        formData.append('title',title);

        post({formData,token})
        handleClose();
    }
  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}    
        className='d-flex flex-column'
    >
        <Modal.Header>
            <Modal.Title>
                Create post
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form onSubmit={handleSumbit} className='d-flex flex-column gap-3'>
                    <Form.Control placeholder='Title' type='text' onChange={(e) => setTitle(e.target.value)}/>
                    <Form.Control  type='file' onChange={(e) => setFile(e.target.files[0])}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={handleClose}>Close</Button>
                <Button onClick={handleSumbit} type='sumbit'>Save</Button>
            </Modal.Footer>
    </Modal>
  )
}

export default PostCreateModal