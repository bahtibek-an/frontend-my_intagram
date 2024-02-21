import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UseSearch from '../hooks/UseSearch';
import { Link } from 'react-router-dom';
import axios from 'axios';
const SearchModal = ({ show, token, setShowS,user }) => {
    const handleClose = () => setShowS(false);
    const { search } = UseSearch();
    const [name, setName] = useState("");
    const [userData, setUserData] = useState([]);

    const handleSumbit = (e) => {
        e.preventDefault();
        search({ name, token, setUserData });
    }

    
    return (
        <Modal
            show={show} 
            onHide={handleClose}
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            className='d-flex flex-column'
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    Search user
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div className="users_wrape">
                    {
                        userData.map((item) => {
                            return (
                                <>
                                    <Link key={item._id} to={user._id === item._id ? `/user/profile/${token}` : `/users/profile/${token}/${item._id}`} className="user" style={{ padding: '10px', width: '600px' }}>
                                        <img style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '20px' }} src={`https://instagram-server-6onu.onrender.com/avatar/image/${item._id}`} alt="avatar" />
                                        {item.name}
                                    </Link>

                                </>
                            )
                        })
                    }
                </div>

                <Modal.Footer style={{ height: '40px', paddingBottom: '11px' }}>
                    <Form style={{ display: 'flex' }}>
                        <Form.Control placeholder='Enter user name' onChange={(e) => setName(e.target.value)} />
                        <Button onClick={handleSumbit}>
                            Sumbit
                        </Button>
                    </Form>
                </Modal.Footer>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='danger' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchModal;
