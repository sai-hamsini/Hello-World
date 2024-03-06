const mongoose = require("mongoose");
var express = require('express');
var routers = require('./routes/routes');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

const mongodatabaseURL = "mongodb+srv://mongoproject:not-correct-password@cluster0.euwkt1u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongodatabaseURL);

const connection = mongoose.connection;

app.listen(port,()=>{
    console.log("Server is running port " +port);
})

connection.once("open",()=>{
    console.log("Connection to MongoDB Successful!");
});

app.use(cors());
app.use(bodyParser.json());
app.use(routers);