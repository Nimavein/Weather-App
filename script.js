let submitButton = document.getElementById('submit-button');
let searchForm = document.getElementById('search-form');


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
        displayData(data);
        formReset();
    } catch(error) {
        alert(error);
        console.log(error);
    };
};


function displayData(data) {
    let cityP = document.getElementById('city');
    let tempInCP = document.getElementById('temp-in-c');
    let tempInFP = document.getElementById('temp-in-f');
    let tempFeelsLikeP = document.getElementById('temp-feels-like');
    let humidityP = document.getElementById('humidity');
    let pressureP = document.getElementById('pressure');
    cityP.innerText = data.cityName;
    tempInCP.innerText = data.tempInC;
    tempInFP.innerText = data.tempInF;
    tempFeelsLikeP.innerText = data.tempFeelsLike;
    humidityP.innerText = data.humidity;
    pressureP.innerText = data.pressure;
};

function getData(weatherData) {
    let cityData = {cityName : weatherData.name, 
        tempInC : kToC(Math.round(weatherData.main.temp)),
        tempInF : kToF(Math.round(weatherData.main.temp)),
        tempFeelsLike : kToC(Math.round(weatherData.main.feels_like)),
        humidity : weatherData.main.humidity,
        pressure : weatherData.main.pressure
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