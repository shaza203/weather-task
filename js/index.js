var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var searchInput = document.getElementById("search");

async function search(city) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=487b9a04416441609dc03557240804&q=${city}&days=3`
  );
  if (response.ok && 400 != response.status) {
    var city = await response.json();
    displaytoday(city.location, city.current);
    displayTomorrow(city.forecast.forecastday);
  }
}

function displaytoday(a, t) {
    if(null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        let cartona1 = `<div class="forecast col-md-6 col-lg-4">
                    <div class="for-bg rounded">
                        <div class="forecast-header">
                            <div class="day">${days[e.getDay()]}</div>
                            <div class="date">${e.getDate() + monthNames[e.getMonth()]}</div>
                        </div>
                        <div class="forecast-content">
                            <div class="location">${a.name}</div>
                            <div class="degree">
                                <div class="num">
                                ${t.temp_c}<sup>o</sup>C
                                </div>
                                <div class="forecast-icon">
                                <img src="https:${t.condition.icon}" width="90" alt="forecast icon">
                                </div>
                            </div>
                            <div class="custom">${t.condition.text}</div>
                            <span><img src="./images/icon-umberella.png" alt="icon">${t.wind_mph}%</span>
                            <span><img src="./images/icon-wind.png" alt="icon">${t.wind_kph} km/h</span>
                            <span><img src="./images/icon-compass.png" alt="icon">${t.wind_dir}</span>
                        </div>
                    </div>
                </div>`
        document.getElementById("forecast").innerHTML = cartona1;
    }
}

function displayTomorrow(a) {
    let cartona2 = "";
    for(let e = 1; e<a.length; e++) {
      cartona2 += `<div class="forecast col-md-6 col-lg-4">
                <div class="for-bg h-100 rounded">
                    <div class="forecast-header justify-content-center">
                        <div class="day">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>
                    </div>
                    <div class="forecast-content">
                        <div class="text-center">
                            <div class="forecast-icon mb-4">
                                <img src="https:${a[e].day.condition.icon}" alt="forecast icon">
                            </div>
                            <div class="text-white fs-4 fw-bold">
                              ${a[e].day.maxtemp_c}<sup>o</sup>C
                            </div>
                            <small class="fs-5">${a[e].day.mintemp_c}<sup>o</sup></small>
                        </div>
                        <div class="custom text-center">${a[e].day.condition.text}</div>
                    </div>
                </div>
              </div>`;
    }
    document.getElementById("forecast").innerHTML += cartona2;
}

document.getElementById("search").addEventListener("keyup", function () {
  search(searchInput.value);
});
document.getElementById("submit").addEventListener("click", function () {
  search(searchInput.value);
});

search("cairo");

