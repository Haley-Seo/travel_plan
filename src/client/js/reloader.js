import {
  initDate
} from './initPage'
import {
  generateQuote
} from './initPage'
const reLoad = (event) => {
  initDate();
  generateQuote();
  let weatherList = document.getElementById('weather-list');
  weatherList.textContent = '';
  let photoList = document.getElementById('place-visual');
  photoList.textContent = '';
  let itinerary = document.getElementById('itinerary');
  itinerary.style.display = 'block';
  let cityName = document.getElementById('place-input');
  cityName.value = '';
  let afterSubmit = document.getElementById('after-submit');
  afterSubmit.style.display = 'none';
}

export {
  generateQuote,
  reLoad,
  initDate
}