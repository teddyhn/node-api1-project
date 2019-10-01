import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function UserCard(props) {

const handleEdit = () => {
    props.handleShow();
    props.setUserToEdit(props.user);
}

const handleDelete = () => {
    props.handleShowDelete();
    props.setUserToEdit(props.user);
}

return (
    <Card bg="dark" text="white" style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.bio}</Card.Text>
            <Card.Text className="card-buttons">
            <FontAwesomeIcon
                icon={faEdit}
                onClick={handleEdit}
            />
            <FontAwesomeIcon 
                icon={faTrash}
                onClick={handleDelete}
            />
            </Card.Text>
        </Card.Body>
    </Card>
  );
}

export default UserCard;
