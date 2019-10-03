import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditUserForm(props) {
const [editingUser, setEditingUser] = useState();

useEffect(() => {
    setEditingUser(props.userToEdit);
}, [props.userToEdit])

const handleChange = evt => {
    setEditingUser({ ...editingUser, [evt.target.name]: evt.target.value });
};

const handleSubmit = evt => {
    evt.preventDefault();
    const updateUser = {
        ...editingUser,
    };

    axios
        .put(`http://localhost:8080/api/users/${props.userToEdit.id}`, updateUser)
        .then(props.getUsers)
    props.handleClose();
};

if (editingUser) {

return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="register-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name"
                        value={editingUser.name}
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
                        value={editingUser.bio}
                        onChange={evt => handleChange(evt)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                Save Changes
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
)}
else return null;
}

export default EditUserForm;
