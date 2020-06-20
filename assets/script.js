//global lattitude and longitude variables
let lat;
let lon;

//get UV data
let getUv = () => {
    let urlKey = `http://api.openweathermap.org/data/2.5/uvi?appid=19b6b8e66066ceceeddf41a7b1b7f8b3&lat=${lat}&lon=${lon}`
    $.ajax({
        url: urlKey, 
        method: 'GET'
    }).then(function(response){
        $('#current-weather').append($('<div id="index-div">').text(`UV Index:`));
        $('#index-div').append($(`<div id="index">`).text(response.value));
    })
}

//get 5 day forecast
// let getForecast = (cityName) => {
//     let urlKey = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=5&appid=19b6b8e66066ceceeddf41a7b1b7f8b3&units=imperial`
//     $.ajax({
//         url: urlKey, 
//         method: 'GET'
//     }).then(function(response){
//         console.log(response);
        
//         })
// }

// get current weather
let getCurrent = (cityName) => {
    let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19b6b8e66066ceceeddf41a7b1b7f8b3&units=imperial`
    $.ajax({
        url: urlKey, 
        method: 'GET'
    }).then(function(response){
        console.log(response);
        lat = response.coord.lat;
        lon = response.coord.lon;
        let cityTitle = $('<h2>').text(`${cityName}(${moment().format('MM')}/${moment().format('DD')}/${moment().format('YYYY')})`);
        $('#current-weather').append(cityTitle);
        let icon = $(`<img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">`);
        $('#current-weather').append(icon);
        $('#current-weather').append($('<div>').text(`Temperature: ${response.main.temp} \xB0F`));
        $('#current-weather').append($('<div>').text(`Humidity: ${response.main.humidity}%`));
        $('#current-weather').append($('<div>').text(`Wind speed: ${response.wind.speed} MPH`));
        getUv();
        // getForecast();    
    })
            
}

// Listen to search key
$('#search').click((event)=>{
    event.preventDefault();
    let newCity = $('#city-search').val();
    $('#city-search').val('');
    getCurrent(newCity);
})