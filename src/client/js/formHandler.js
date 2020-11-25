function handleSubmit(event) {
  event.preventDefault()
  let cityName = document.getElementById('place-input').value;

  sendPlace('http://localhost:3000/geo', cityName)
    .then((data) => console.log(data));
  console.log('city data gotten');

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
    const sentiData = await response.json();
    console.log('cdResult', sentiData);
    // document.getElementById('name').value = '';
    // document.getElementById('scoretag').textContent = `Score: ${sentiData.score_tag}`;
    // document.getElementById('agreement').textContent = `Agreement: ${sentiData.agreement}`;
    // document.getElementById('subjectivity').textContent = `Subjectivity: ${sentiData.subjectivity}`;
    // document.getElementById('irony').textContent = `Irony: ${sentiData.irony}`;

    return sentiData;
  } catch (error) {
    console.log('error', error);
  }
}

export {
  handleSubmit,
  sendPlace
}