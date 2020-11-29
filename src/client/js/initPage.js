//Travel Quote
const travelQuote = {
  "data": [{
      "quote": "Once a year, go someplace you've never been before.",
      "person": "Dalai Lama"
    },
    {
      "quote": "Never let your memories be greater than your dreams.",
      "person": "Douglas Ivester"
    },
    {
      "quote": "It is better to travel well than to arrive.",
      "person": "Buddha"
    },
    {
      "quote": "A mind that is stretched by a new experience can never go back to its old dimensions.",
      "person": "Oliver Wendell Holmes"
    },
    {
      "quote": "Do not dare not to dare.",
      "person": "C.S. Lewis"
    }
  ]
}
var quoteItem = document.getElementById('quote');
var personItem = document.getElementById('person');
const generateQuote = () => {
  let idx = Math.floor(Math.random() * travelQuote.data.length)
  quoteItem.textContent = `"${travelQuote.data[idx].quote}"`;
  personItem.textContent = `- ${travelQuote.data[idx].person}`;
}

// date range initialize - start date : tomorrow ~ d+16 , end date 
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
generateQuote();

export {
  initDate,
  dateFormat,
  generateQuote
}