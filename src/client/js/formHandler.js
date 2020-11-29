import {
  checkDate
} from './dateChecker'
import {
  checkCity
} from './cityChecker'
import {
  initDate
} from './initPage'
const errorMsg = document.getElementById('error-message');

const handleSubmit = (event) => {
  event.preventDefault()
  let cityName = document.getElementById('place-input').value;
  let sDt = document.getElementById('start-date').value;
  let eDt = document.getElementById('end-date').value;
  console.log(sDt, eDt)

  if (!checkDate(sDt, eDt)) {
    initDate();
    alert("Error : You cannot enter end date prior to start date");
    return null;
  }

  //City name should be longer than 1 letter.
  if (!checkCity(cityName)) {
    cityName = '';
    alert("Error : Input valid city Name");
    return null;
  }

  let itinerary = document.getElementById('itinerary');
  itinerary.style.display = 'none';
  let afterSubmit = document.getElementById('after-submit');
  afterSubmit.style.display = 'block';
  let duration = (new Date(eDt) - new Date(sDt)) / (24 * 3600 * 1000) + 1;
  let arrivalCity = document.getElementById('arrival-city');
  let departDate = document.getElementById('depart-date');
  let calDuration = document.getElementById('duration');

  arrivalCity.textContent = cityName.toUpperCase();
  departDate.textContent = sDt;
  calDuration.textContent = duration;


  //chain promises  sendPlace -> getWeather -> updateUI
  sendPlace('http://localhost:3000/geo', cityName)
    .then((placeData) => getWeather('http://localhost:3000/weather', placeData))
    .then((weatherData) => updateWeatherUI(weatherData));
  console.log('weather data gotten');

  getPhoto('http://localhost:3000/photo', cityName)
    .then((photoData) => updatePhotoUI(photoData));
  console.log('photo data gotten');
}

const sendPlace = async (url = '', data) => {
  // alert('Before fetch city Name' + data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: data
    })
  });
  try {
    const placeData = await response.json();
    if (!placeData || placeData.totalResultsCount === 0)
      throw 'Error : Cant find geo data.'
    console.log(placeData);
    return placeData;
  } catch (error) {
    console.log('error', error);
    let cityName = document.getElementById('place-input').value;
    errorMsg.textContent = errorMsg.textContent + ' GeoNames cannot find geographic data for ' + cityName + '.';
    return null;
  }
}

const getWeather = async (url = '', data) => {
  console.log('place data from geonames', data);
  if (!data || data.totalResultsCount === 0) {
    // alert('Please, input valid city name.');
    return null;
  }
  // alert('geodata' + data.geonames[0]);
  let geolat = data.geonames[0].lat;
  let geolon = data.geonames[0].lng;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lat: geolat,
      lon: geolon
    })
  });
  try {
    const weatherData = await response.json();
    if (!weatherData) throw 'Error : Cannot find weather.';
    return weatherData;
  } catch (error) {
    console.log('error', error);
    let cityName = document.getElementById('place-input').value;
    errorMsg.textContent = errorMsg.textContent + ' Weatherbit cannot find weather data for ' + cityName + '.';
    return null;
  }
}

const getPhoto = async (url = '', data) => {
  // alert('Before fetch city Name - getphoto' + data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: data
    })
  });
  try {
    const photoData = await response.json();
    if (!photoData || !('hits' in photoData) || !photoData.hits.length)
      throw 'Error : Cant find photo data.'
    console.log(photoData);
    return photoData;
  } catch (error) {
    console.log('error', error);
    let cityName = document.getElementById('place-input').value;
    errorMsg.textContent = errorMsg.textContent + ' Pixabay cannot find photos for ' + cityName + '.';
    return null;
  }
}

const updateWeatherUI = (weatherData) => {
  if (!weatherData) return null;
  let array = weatherData.data;
  let weatherList = document.getElementById('weather-list');
  array.forEach(dailyW => {
    let dailyItem = document.createElement('div');
    dailyItem.classList.add('daily-weather');
    let dateItem = document.createElement('div');
    dateItem.classList.add('daily-date');
    dateItem.textContent = dailyW.valid_date.slice(5);
    let tempItem = document.createElement('div');
    tempItem.classList.add('temp');
    tempItem.textContent = `${dailyW.high_temp} C`;
    let weatherItem = document.createElement('div');
    weatherItem.classList.add('weather');
    weatherItem.textContent = dailyW.weather.description;
    dailyItem.appendChild(dateItem);
    dailyItem.appendChild(tempItem);
    dailyItem.appendChild(weatherItem);
    weatherList.appendChild(dailyItem);
  })

}

const updatePhotoUI = (photoData) => {
  if (!photoData) return null;
  let array = photoData.hits;
  let photoList = document.getElementById('place-visual');
  console.log(photoList);
  console.log(array);
  for (let i = 0; i < Math.min(8, array.length); i++) {
    let photoItem = document.createElement('div');
    photoItem.classList.add('img-flex');
    let imgItem = document.createElement('div');
    imgItem.classList.add('place-img');
    imgItem.innerHTML = `<a href="${array[i].pageURL}" target="_blank"><img class="center-cropped" src="${array[i].webformatURL}"></a>`
    let tagItem = document.createElement('div');
    tagItem.classList.add('place-tag');
    tagItem.innerText = array[i].tags;
    photoItem.appendChild(imgItem);
    photoItem.appendChild(tagItem);
    photoList.appendChild(photoItem);
  }
}

export {
  handleSubmit,
  sendPlace,
  getWeather,
  updateWeatherUI,
  checkDate,
  getPhoto,
  updatePhotoUI,
  checkCity,
  initDate
}