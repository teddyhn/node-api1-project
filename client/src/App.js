import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';
import EditUserForm from './components/EditUserForm';
import DeleteUserPrompt from './components/DeleteUserPrompt';
import AddUserForm from './components/AddUserForm';
import CardDeck from 'react-bootstrap/CardDeck';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [users, setUsers] = useState();
  const [userToEdit, setUserToEdit] = useState();
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const getUsers = () => {
    axios
      .get('http://localhost:8080/api/users')
      .then(res => {
        setUsers(res.data);
      })
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <Jumbotron fluid>
        <h1>Look at all these users...</h1>
        <p>Now add one!</p>
        <p>
          <Button 
            className="jumbotron-button"
            onClick={handleShowAdd}
          >
            Add new user
          </Button>
        </p>
      </Jumbotron>
      <CardDeck>
        {users && users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            name={user.name} 
            bio={user.bio} 
            id={user.id} 
            handleShow={handleShow}
            handleShowDelete={handleShowDelete}
            setUserToEdit={setUserToEdit}
          />
        ))}
      </CardDeck>

      <EditUserForm show={show} handleClose={handleClose} userToEdit={userToEdit} getUsers={getUsers} />
      <DeleteUserPrompt showDelete={showDelete} handleCloseDelete={handleCloseDelete} userToEdit={userToEdit} getUsers={getUsers} />
      <AddUserForm showAdd={showAdd} handleCloseAdd={handleCloseAdd} getUsers={getUsers} />
    </div>
  );
}

export default App;
