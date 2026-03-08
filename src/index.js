function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature")
  let temperature = response.data.temperature.current
  let cityElement = document.querySelector("#city")
  let descriptionElement = document.querySelector("#description")
  let humidityElement = document.querySelector("#humidity")
  let windElement = document.querySelector("#wind")
  let timeElement = document.querySelector("#time")
  let date = new Date(response.data.time * 1000)
  let iconElement = document.querySelector("#icon")

  cityElement.innerHTML = response.data.city
  timeElement.innerHTML = formatDate(date)
  descriptionElement.innerHTML = response.data.condition.description
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`
  windElement.innerHTML = `${response.data.wind.speed} km/h`
  temperatureElement.innerHTML = Math.round(temperature)
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`
}

function formatDate(date) {
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  let day = days[date.getDay()]

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day} ${hours}:${minutes}`
}

function searchForCity(city) {
  let apiKey = "d37caee084ftd6c3baf32ae334oca1bf"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(refreshWeather)
}

function searchCity(event) {
  event.preventDefault()
  let searchInput = document.querySelector("#search-form-input")
  searchForCity(searchInput.value)
}

function getForecast(city) {
  let apiKey = "d37caee084ftd6c3baf32ae334oca1bf"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  console.log(apiUrl)
}

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  let forecastHtml = ""

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
     <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15°</strong>
          </div>
          <div class="weather-forecast-temperature">9°</div>
        </div>
      </div>
      `
  })

  let forecastElement = document.querySelector("#forecast")
  forecastElement.innerHTML = forecastHtml
}

let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", searchCity)

searchCity("Uithoorn")
getForecast("Uithoorn")
displayForecast()
