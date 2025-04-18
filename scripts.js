const API_KEY = 'your-openweather-api-key';  // Get from OpenWeather API
const ratings = JSON.parse(localStorage.getItem('ratings')) || {};

// Function to show weather for a destination
function showWeather(destination) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${API_KEY}&units=metric`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0].description;
      const temperature = data.main.temp;

      const weatherElement = document.getElementById(`${destination}-weather`);
      weatherElement.innerHTML = `<p>${weather}</p><p>Temperature: ${temperature}°C</p>`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Function to render stars for rating
function renderStars(destination) {
  const starsElement = document.getElementById(`${destination}-stars`);
  starsElement.innerHTML = ''; // Clear existing stars
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.innerHTML = '★';
    star.dataset.value = i;
    star.onclick = () => rateDestination(destination, i);
    starsElement.appendChild(star);
  }
}

// Function to rate a destination
function rateDestination(destination, value) {
  ratings[destination] = value;
  localStorage.setItem('ratings', JSON.stringify(ratings));
  displayRating(destination);
}

// Function to display the average rating for a destination
function displayRating(destination) {
  const ratingElement = document.getElementById(`${destination}-rating`);
  const rating = ratings[destination] || 0;
  ratingElement.innerHTML = `Rating: ${rating} / 5`;
}

// Function to submit a review
function submitReview(destination) {
  const reviewText = document.getElementById(`${destination}-review`).value.trim();
  if (reviewText) {
    alert(`Review submitted for ${destination}: ${reviewText}`);
    document.getElementById(`${destination}-review`).value = '';
  } else {
    alert('Please write a review before submitting!');
  }
}

// Initialize the reviews and weather when the page loads
window.onload = function () {
  renderStars('bali');
  displayRating('bali');
};
