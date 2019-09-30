// implement your API here

const express = require('express'); // CommonJS Modules, equivalent to above

const database = require('./data/db.js');

const server = express();

server.use(express.json());

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

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;

    console.log('Data: ', `name: ${name}, bio: ${bio}`);

    if (!name || !bio) {
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
    }

    database
        .insert(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
});

const port = 8080;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`));