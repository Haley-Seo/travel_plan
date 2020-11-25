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


console.log(__dirname)


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
  // res.sendFile(path.resolve('src/client/views/index.html'))
})

//Setup Server
const port = 3000;
const server = app.listen(port, function () {
  console.log('Server is running on port 3000......');
});

app.post('/geo', async (req, res) => {
  const geoUrl = "http://api.geonames.org/searchJSON?q="
  const geo_key = 'arsene77'
  console.log(req.body.text);
  const city = req.body.text;
  const tmp = geoUrl + city + '&maxRows=10&username=' + geo_key;
  console.log(tmp);
  const response = await axios.post(tmp, {})
  try {
    console.log(response);
    // apiResult.score_tag = response.data.score_tag;
    // apiResult.agreement = response.data.agreement;
    // apiResult.subjectivity = response.data.subjectivity;
    // apiResult.irony = response.data.irony;
    // const result = JSON.stringify(apiResult);
    // console.log(result);
    // res.send(apiResult);
    res.send(response);
    // res.send(result)

  } catch (error) {
    console.log('error', error)
  }

})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})