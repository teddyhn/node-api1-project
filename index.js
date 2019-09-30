// implement your API here

const express = require('express'); // CommonJS Modules, equivalent to above

const database = require('./data/db.js');

const server = express();

server.use(express.json());