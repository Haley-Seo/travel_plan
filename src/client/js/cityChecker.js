//check if city name has a space
const checkCity = (cityName) => {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'
  cityName = cityName.toLowerCase();
  for (let ch of cityName) {
    if (alphabet.indexOf(ch) === -1) return false;
  }
  return true;
}

export {
  checkCity
}