var express = require('express');
var routes = require('./routes/routes');
var server = express();

const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/packers');

// Check if the connection is successful
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Print an error message if connection is not successful
db.on('error', (error) => {
  console.error('Failed to connect to MongoDB:', error);
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8000, function check(error){
        if(error){
            console.log("Error!")
        }
        else{
            console.log("Server started and is listening on port 8000 ...")
        }
    });

