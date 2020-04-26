const express = require('express');
const mongoose = require("mongoose");
const app = express();

const message = "hello world";
const dbUrl = process.env.mongodb_uri

const server = app.listen(8080);

// test return hello world
app.get('/test/message', (request, response) => {
    response.send(message);
})

// test 

var Categories = mongoose.model('Categories', {
    _id : String,
    name : String,
    subCategories : [],
    _class : String,
})

mongoose.connect(dbUrl, (err) => {
    console.log('mongo db connection', err);
})

app.get('/categories', (request, response) => {
    Categories.find({}, (err, message) =>{
        console.log(message);
        response.send(message);
    })
})
