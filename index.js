const express = require('express');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
const bodyParser = require('body-parser');

const message = "hello world";
const dbUrl = process.env.mongodb_uri

const server = app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}))
// test return hello world
app.get('/test/message', (request, response) => {
    response.send(message);
})

// test 
var Category = mongoose.model('Category', {
    name : String,
    _class : String,
})

app.get('/test/mongo', (request, response) => {
    Category.find({}, (err, message) =>{
        console.log(message);
        response.send(message);
    })
})

app.post('/test/mongo/save', (request, response) => {
    var category = new Category(request.body);

    category.save((err) => {
        if (err)
            sendStatus(500);
        response.send(request.body);
        // response.sendStatus(200);
    })
})

var product = new Schema({name: String, categoryId: String, subCategoryId: String})
var subCategory = new Schema({ name: String, category: String, products:[product]});

var Categories = mongoose.model('Categories', {
    name : String,
    subCategories : [subCategory],
    _class : String,
})

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('mongo db connection', err);
})

app.get('/categories', (request, response) => {
    Categories.find({}, (err, message) =>{
        console.log(message);
        response.send(message);
    })
})
