import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteUserPrompt(props) {
const handleDelete = evt => {
    evt.preventDefault();
    axios
        .delete(`http://localhost:8080/api/users/${props.userToEdit.id}`)
        .then(props.getUsers)
    props.handleCloseDelete();
};

return (
    <Modal show={props.showDelete} onHide={props.handleCloseDelete}>
        <Modal.Header closeButton>
            <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you wish to delete this user?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleDelete}>Confirm</Button>
        </Modal.Footer>
    </Modal>
)
}

export default DeleteUserPrompt;