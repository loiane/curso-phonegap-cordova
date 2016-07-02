var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    tasks = require('./app/routes/tasks'),
    cors = require("cors"),
    app = express(),
    dbName = 'tasksDB',
    connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', tasks);

module.exports = app;
