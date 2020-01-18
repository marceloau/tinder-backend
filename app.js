
const express = require('express');
const mongoose = require('mongoose');
const routesDEV = require('./src/routes');

const app = express();

mongoose.connect('mongodb+srv://marceloaurino:marcelo35421321@cluster0-gj26a.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routesDEV);


app.listen(3333);