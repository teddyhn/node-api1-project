require('./process.env').config();

// implement your API here

const express = require('express');

const cors = require('cors');

const database = require('./data/db.js');

const server = express();

const port = process.env.PORT || 5000;

server.use(express.json());

server.use(cors());

server.get('/api/users', (req, res) => {
    database
        .find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    database
        .findById(id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else res.send(data);
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;

    console.log('Data: ', `name: ${name}, bio: ${bio}`);

    if (!name || !bio) {
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
    }

    else database
        .insert(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
});

server.delete('/api/users/:id', (req, res) => {
    id = req.params.id;

    database
        .remove(id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else res.send({ message: "The user was successfully deleted." });
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })
        })
});

server.put('/api/users/:id', (req, res) => {
    id = req.params.id;
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    else database
        .update(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
});

const port = 8080;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`));