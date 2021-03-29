
//api call
const api = {
    key: "21c04cf19c1755c7724bc23bda6017f1",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode ==13){
        getResults(searchbox.value);
        
    }
} 

//fetch data provided by api call and save it to weather
function getResults (query) {
fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
.then(weather => {
    return weather.json();
}).then(displayResults);
}


//function for displaying data in the html
function displayResults(weather) {
    //console.log(weather);
    let city = document.querySelector('.place .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`; 

    let now =new Date();
    let date = document.querySelector('.place .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.present .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.present .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}