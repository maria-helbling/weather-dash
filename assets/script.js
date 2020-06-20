
// get current weather
let getCurrent = (cityName) => {
    let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19b6b8e66066ceceeddf41a7b1b7f8b3&units=imperial`
    $.ajax({
        url: urlKey, 
        method: 'GET'
    }).then(function(response){
        console.log(response);
        $('#current-weather').append($('<p>').text(`Temperature: ${response.main.temp} \xB0F`));
        $('#current-weather').append($('<p>').text(`Humidity: ${response.main.humidity}%`));
        $('#current-weather').append($('<p>').text(`Wind speed: ${response.wind.speed} MPH`));
        })
}

// Listen to search key
$('#search').click((event)=>{
    event.preventDefault();
    let newCity = $('#city-search').val()
    $('#city-search').val('')
    getCurrent(newCity);
    let cityTitle = $('<h2>').text(`${newCity}`)
    $('#current-weather').append(cityTitle)
})