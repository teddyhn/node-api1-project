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
            res.send(err);
        });
});

server.post('/api/users', (req, res) => {
    const data = req.body;

    console.log('Data: ', data);

    database
        .insert(data)
        .then(x => {
            res.json(x);
        })
        .catch(err => {
            res.json({ errorMessage: "Please provide name and bio for the user." })
        })
});

const port = 8080;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`));