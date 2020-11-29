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
  const tmp = geoUrl + city + '&maxRows=1&username=' + geo_key;
  console.log(tmp);
  const response = await axios.post(tmp, {})
  try {
    console.log(response.data.geonames);
    res.send(response.data);
  } catch (error) {
    console.log('error', error)
    res.send(null);
  }
});

app.post('/weather', async (req, res) => {
  const weatherUrl = "http://api.weatherbit.io/v2.0/forecast/daily?";
  const weather_key = '785e3e2771684142bde68004d75f7907';
  console.log(req.body);
  let lat = 'lat=' + req.body.lat;
  let lon = 'lon=' + req.body.lon;
  const tmp = weatherUrl + lat + '&' + lon + '&key=' + weather_key;
  console.log(tmp);
  const response = await axios.post(tmp, {})
  try {
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log('error', error)
    res.send(null);
  }
});


app.post('/photo', async (req, res) => {
  const photoUrl = 'https://pixabay.com/api/?key=';
  const photo_key = '19301360-6416fd30b969a325f65e85d0f';
  console.log(req.body.text);
  const city = req.body.text;
  const tmp = photoUrl + photo_key + '&q=' + city + '&image_type=photo&pretty=true';
  console.log(tmp);
  const response = await axios.post(tmp, {})
  try {
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log('error', error);
    res.send(null);
  }

})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
});