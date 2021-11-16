//Modules
const express = require('express');
const apiRouter = require('./routes/api');

//Init
const app = express();


//Parse the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Require DB
require('./db');


//Routes
app.use('/', apiRouter);

//Server Up
app.listen(3000, function() {
    console.log("Server up on 3000");
})