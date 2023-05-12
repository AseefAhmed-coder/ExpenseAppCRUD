const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const { db } = require('./db/db');
const { readdirSync } = require('fs');

//middleware
app.use(cors());
app.use(express.json());

//Routes
readdirSync('./routes').map((route) => app.use('/api/v1/', require('./routes/' + route)));

//Get a request on the server
app.get('/', (req, res) => {
    res.send('Hello World My Server !');
});

//connect to the server
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Your Listening on Port http://localhost:${PORT}/`);
    });
}
server();