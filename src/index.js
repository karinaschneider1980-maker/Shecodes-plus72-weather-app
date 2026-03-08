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
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`
  temperatureElement.innerHTML = Math.round(temperature)
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`

  let condition = response.data.condition.description.toLowerCase()

  if (condition.includes("cloud")) {
    document.body.style.background = "linear-gradient(#d7dde8,#a6b1c2)"
  } else if (condition.includes("rain")) {
    document.body.style.background = "linear-gradient(#5f6c7b,#3f4c5a)"
  } else if (condition.includes("clear")) {
    document.body.style.background = "linear-gradient(#74b9ff,#a29bfe)"
  } else if (condition.includes("snow")) {
    document.body.style.background = "linear-gradient(#e6foff,#cfd9df)"
  }

  getForecast(response.data.city)
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000)
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[date.getDay()]
}

function getForecast(city) {
  let apiKey = "d37caee084ftd6c3baf32ae334oca1bf"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast)
}

function displayForecast(response) {
  console.log(response.data)

  let forecastHtml = ""

  response.data.daily.forEach(function (day, index) {
    if (index < 6 && index > 0) {
      forecastHtml =
        forecastHtml +
        `
     <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
        </div>
      </div>`
    }
  })

  let forecastElement = document.querySelector("#forecast")
  forecastElement.innerHTML = forecastHtml
}

let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", searchCity)

searchForCity("Uithoorn")
