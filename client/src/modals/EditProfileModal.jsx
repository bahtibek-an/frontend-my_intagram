import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import UseEditProfile from '../hooks/UseEditProfile'
import { ToastContainer } from 'react-toastify'

const EditProfileModal = ({ show, setShow, token }) => {
    const handleClose = () => setShow(false)
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [file, setFile] = useState(null)
    const { edit } = UseEditProfile();
    const handleSumbit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name)
        formData.append("bio", bio)
        formData.append("file", file)

        edit({ formData, token })
    }
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
        >
            <ToastContainer
                closeOnClick
                autoClose={5000}
                rtl={false}
            />
            <Modal.Header>
                <Modal.Title>
                    Edit profile
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Form >
                    <Form.Control onChange={(e) => setName(e.target.value)} placeholder='Edit your name' type='text' style={{ marginBottom: "20px" }} />
                    <Form.Control onChange={(e) => setBio(e.target.value)} placeholder='Edit your bio' type='text' />
                    <Form.Control onChange={(e) => setFile(e.target.files[0])} type='file' style={{ marginTop: "20px" }} />
                    <Button style={{ marginTop: '15px' }} onClick={handleSumbit}>Sumbit</Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='danger' onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditProfileModal