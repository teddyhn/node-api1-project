import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddUserForm(props) {
const [newUser, setNewUser] = useState({
    name: '',
    bio: ''
});

const handleChange = evt => {
    setNewUser({ ...newUser, [evt.target.name]: evt.target.value });
};

const handleSubmit = evt => {
    evt.preventDefault();
    const addUser = {
        ...newUser,
    };

    axios
        .post(`http://localhost:8080/api/users`, addUser)
        .then(props.getUsers)
    props.handleCloseAdd();
};

return (
    <Modal show={props.showAdd} onHide={props.handleCloseAdd}>
        <Modal.Header closeButton>
            <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="register-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name"
                        value={newUser.name}
                        onChange={evt => handleChange(evt)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="3" 
                        type="text" 
                        name="bio"
                        value={newUser.bio}
                        onChange={evt => handleChange(evt)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
)
}

export default AddUserForm;
