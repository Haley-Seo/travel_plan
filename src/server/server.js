const cdResult = {}
const weatherResult = {}
const picResult = {}

var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

//Start up an instance of app
const app = express();


//Middleware/
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Initialize the main project folder
app.use(express.static('dist'));

//Setup Server
const port = 3000;
const server = app.listen(port, function () {
  console.log('Server is running on port 3000......');
});

app.post('/add', postData);

function postData(request, response) {
  response.send({
    message: 'post received'
  })
  console.log('postData');
}

app.get('/all', getData);

function getData(request, response) {
  response.send(cdResult);
  console.log('server get')
}