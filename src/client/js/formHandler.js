import {
  checkDate
} from './dateChecker'

const errorMsg = document.getElementById('error-message');

//date range initialize - start date : tomorrow ~ d+16 , end date 
var sDate = document.getElementById('start-date');
var eDate = document.getElementById('end-date');

console.log(sDate.value, eDate.value);

const initDate = () => {
  console.log('getDate was called');
  const today = new Date();
  const tomorrow = new Date(today);
  const maxDate = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);
  maxDate.setDate(maxDate.getDate() + 15);

  console.log('tomorrow1', tomorrow)
  sDate.value = dateFormat(tomorrow);
  sDate.min = dateFormat(tomorrow);
  sDate.max = dateFormat(maxDate);
  eDate.value = dateFormat(tomorrow);
  eDate.min = dateFormat(tomorrow);
}
const dateFormat = (d) => {
  const dd = d.getDate();

  const mm = d.getMonth() + 1;
  const yyyy = d.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${yyyy}-${mm}-${dd}`;
}

initDate();

const handleSubmit = (event) => {
  event.preventDefault()
  let cityName = document.getElementById('place-input').value;
  let sDt = document.getElementById('start-date').value;
  let eDt = document.getElementById('end-date').value;
  console.log(sDt, eDt)
  alert('before checkDate');
  if (!checkDate(sDt, eDt)) {
    initDate();
    alert("Error : You cannot enter end date prior to start date");
    return null;
  }

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
  alert('Before fetch city Name' + data);
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
    if (!placeData) throw 'Error : Cant find geo data.'
    console.log(placeData);
    return placeData;
  } catch (error) {
    console.log('error', error);
    errorMsg.textContent = 'Please, input valid city name.';
    return null;
  }
}

const getWeather = async (url = '', data) => {
  alert('geodata' + data.geonames[0]);
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
    errorMsg.textContent = 'Error : Cannot find weather.';
    return null;
  }
}

const getPhoto = async (url = '', data) => {
  alert('Before fetch city Name - getphoto' + data);
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
    if (!photoData || !photoData.hits.length) throw 'Error : Cant find photo data.'
    console.log(photoData);
    return photoData;
  } catch (error) {
    console.log('error', error);
    errorMsg.textContent = 'Please, input valid city name.';
    return null;
  }
}





const updateWeatherUI = (weatherData) => {

}

const updatePhotoUI = (photoData) => {
  let array = photoData.hits;
  let photoItem = document.getElementById('place-visual');
  console.log(photoItem);
  console.log(array);
  for (let i = 0; i < Math.min(4, array.length); i++) {
    let imgItem = document.createElement('div');
    imgItem.classList.add('place-img');
    imgItem.innerHTML = `<a href="${array[i].pageURL}" target="_blank"><img src="${array[i].webformatURL}"></a>`
    let tagItem = document.createElement('div');
    tagItem.classList.add('place-tag');
    tagItem.innerText = array[i].tags;
    photoItem.appendChild(imgItem);
    photoItem.appendChild(tagItem);
  }
}



export {
  handleSubmit,
  sendPlace,
  getWeather,
  updateWeatherUI,
  initDate,
  dateFormat,
  checkDate,
  getPhoto,
  updatePhotoUI
}