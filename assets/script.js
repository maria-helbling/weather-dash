//global lattitude and longitude variables
let lat;
let lon;
//UV level colors
let uvLevels=['green','green','green', 'gold','gold','gold', 'orange','orange', 'red', 'red', 'red']

//load page with past searches
let  storedCities=localStorage.getItem('cityHistory')

let renderHistory ()

let storeSearches = (newCity) => {
    if(storedCities.includes(newCity)) {
        storedCities.filter((name) => name === newCity)
    }
    storedCities.unshift(newCity)
    renderHistory();
}

//get UV data
let getUv = () => {
    let urlKey = `http://api.openweathermap.org/data/2.5/uvi?appid=19b6b8e66066ceceeddf41a7b1b7f8b3&lat=${lat}&lon=${lon}`
    $.ajax({
        url: urlKey, 
        method: 'GET'
    }).then(function(response){
        $('#current-weather').append($('<div id="index-div">').text(`UV Index:`));
        $('#index-div').css('display', 'inline-block')
        let uvValueDiv = $(`<div id="index">`).text(response.value)
        $('#index-div').append(uvValueDiv);
        //background color based on threat level
        if (Math.floor(response.value) <11 ) {
            uvValueDiv.css('background-color', uvLevels[Math.floor(response.value)])
        } else {uvValueDiv.css('background-color','purple')}
        uvValueDiv.css('color','white') 
    })
}

//get 5 day forecast
let getForecast = () => {
    let urlKey = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=19b6b8e66066ceceeddf41a7b1b7f8b3&units=imperial`
    console.log(urlKey)
    $.ajax({
        url: urlKey, 
        method: 'GET'
    }).then(function(response){
        for (i=1; i<6;i++) {
        let card = $('<div>').css('display', 'inline-block');
        card.append($('<h2>').text('date goes here'));
        card.append($(`<img src="http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png">`));
        card.append($('<p>').text(`Temp: ${response.daily[i].temp.day}\xB0F`));
        card.append($('<p>').text(`Humidity: ${response.daily[i].humidity}%`));
        $('#forecast').append(card);
        }
    })
}

// get current weather
let getCurrent = (cityName) => {
    let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19b6b8e66066ceceeddf41a7b1b7f8b3&units=imperial`
    $.ajax({
        url: urlKey, 
        method: 'GET'
    }).then(function(response){
        lat = response.coord.lat;
        lon = response.coord.lon;
        let cityTitle = $('<h2>').text(`${cityName}(${moment().format('MM')}/${moment().format('DD')}/${moment().format('YYYY')})`);
        $('#current-weather').append(cityTitle);
        cityTitle.css('display','inline-block')
        let icon = $(`<img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">`);
        $('#current-weather').append(icon);
        $('#current-weather').append($('<div>').text(`Temperature: ${response.main.temp} \xB0F`));
        $('#current-weather').append($('<div>').text(`Humidity: ${response.main.humidity}%`));
        $('#current-weather').append($('<div>').text(`Wind speed: ${response.wind.speed} MPH`));
        // getUv();
        getForecast();    
    })
            
}

//past searches storage
let storeSearches = (cityName) => {

}

// Listen to search key
$('#search').click((event)=>{
    event.preventDefault();
    let newCity = $('#city-search').val();
    $('#city-search').val('');
    if (newCity) {
        getCurrent(newCity);
        $('#current-weather').empty();
        $('#forecast').empty();
        
    }
})