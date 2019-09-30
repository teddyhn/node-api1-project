import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users')
      .then(res => {
        setUsers(res.data);
      })
  }, []);

  console.log(users);

  return (
    <div className="App">
      <CardDeck>
        {users && users.map(user => (
          <Card bg="dark" text="white" style={{ width: '18rem' }} key={user.id}>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.bio}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}

export default App;
