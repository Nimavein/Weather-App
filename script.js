let submitButton = document.getElementById('submit-button');
let searchForm = document.getElementById('search-form');
let errorP = document.getElementById('error');
let verticalLine = document.getElementById('vertical-line');

submitButton.addEventListener("click", submitData);
searchForm.addEventListener("submit", submitData);

function submitData(q) {
    q.preventDefault();
    getWeatherInfo()
}

async function getWeatherInfo(){
    try {
        const searchInputValue = await document.getElementById('search-input').value;
        const fetchValue = await `http://api.openweathermap.org/data/2.5/weather?q=${searchInputValue}&appid=3f05cdb8836f854ec804cf8f7b03ef7c`
        const response = await fetch(fetchValue, {mode: 'cors'})
        const weatherData = await response.json();
        const data = getData(weatherData);
        verticalLine.classList.remove('invisible');
        displayData(data);
        console.log(weatherData);
        formReset();
        if (errorP.innerText != "") {
            errorP.innerText = ""
        }
    } catch(error) {
        
        errorP.innerText = "Can't find data for this city";
    };
};


function displayData(data) {
    let cityP = document.getElementById('city');
    let descriptionP = document.getElementById('description');
    let tempInCP = document.getElementById('temp-in-c');
    let tempInFP = document.getElementById('temp-in-f');
    let tempFeelsLikeP = document.getElementById('temp-feels-like');
    let humidityP = document.getElementById('humidity');
    let pressureP = document.getElementById('pressure');
    let windP = document.getElementById('wind')
    descriptionP.innerText = (data.description).toUpperCase();
    cityP.innerText = data.cityName.toUpperCase();
    tempInCP.innerText = data.tempInC + "°C";
    tempInFP.innerText = data.tempInF + "°F";
    tempFeelsLikeP.innerText = "FEELS LIKE: " + data.tempFeelsLike + "°C";
    windP.innerText = "WIND: " + data.wind + " km/h";
    humidityP.innerText = "HUMIDITY: " + data.humidity + "%";
    pressureP.innerText = "PRESSURE: " +  data.pressure + " hPa";
};

function getData(weatherData) {
    let cityData = {cityName : weatherData.name, 
        tempInC : kToC(Math.round(weatherData.main.temp)),
        tempInF : Math.round(kToF(weatherData.main.temp)),
        tempFeelsLike : kToC(Math.round(weatherData.main.feels_like)),
        humidity : weatherData.main.humidity,
        pressure : weatherData.main.pressure,
        description : weatherData.weather[0].description,
        wind : Math.round(weatherData.wind.speed * 1.6)
    }
    function kToC(kTemp) {
        return kTemp - 273
    }
    function kToF(kTemp) {
        return (kTemp - 273) * 9/5 + 32
    }
    return cityData;
}

function formReset() {
    searchForm.reset();
}



// api.openweathermap.org/data/2.5/weather?q=${searchInputValue}&appid=3f05cdb8836f854ec804cf8f7b03ef7c