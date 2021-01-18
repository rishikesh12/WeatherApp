const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const successElement = document.getElementById('success-message');
const errorElement = document.getElementById('error-message');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  errorElement.textContent = '';
  successElement.textContent = '';
  const location = search.value;

  fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
  response.json().then((data) => {
    if(data.error) {
      errorElement.textContent = data.error;
    }
    else {
      successElement.textContent= data.forecast;
      }
    });
  });
  console.log(location);
});