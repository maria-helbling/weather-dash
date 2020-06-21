//global lattitude and longitude variables
let lat;
let lon;
//UV level colors
let uvLevels = ['green', 'green', 'green', 'gold', 'gold', 'gold', 'orange', 'orange', 'red', 'red', 'red']

//load page with past searches
let storedCities = [];


//put past searches on the page
let renderHistory = () => {
    $('#past-searches').empty();
    storedCities.forEach((value) => {
        let nameBtn = $(`<button class="history hollow button expanded secondary" type="button" data-name="${value}">`).text(value);
        $('#past-searches').append(nameBtn);
    })
}

//write new name into local storage
let storeSearches = (newCity) => {
    //handle if the new city is already in the history
    if (storedCities.includes(newCity)) {
        storedCities =  storedCities.filter((value) => { return value !== newCity})
    }
    storedCities.unshift(newCity)
    renderHistory();
    localStorage.setItem('cityHistory', JSON.stringify(storedCities))
}

//get UV data
let getUv = () => {
    let urlKey = `http://api.openweathermap.org/data/2.5/uvi?appid=19b6b8e66066ceceeddf41a7b1b7f8b3&lat=${lat}&lon=${lon}`
    $.ajax({
        url: urlKey,
        method: 'GET'
    }).then(function (response) {
        $('#current-weather').append($('<div class="cell shrink" id="index-div">').text(`UV Index:`));
        let uvValueDiv = $(`<div class="cell shrink" id="index">`).text(response.value)
        $('#current-weather').append(uvValueDiv);
        //background color based on threat level
        if (Math.floor(response.value) < 11) {
            uvValueDiv.css('background-color', uvLevels[Math.floor(response.value)])
        } else { uvValueDiv.css('background-color', 'purple') }
        uvValueDiv.css('color', 'white')
    })
}

//get 5 day forecast
let getForecast = () => {
    let urlKey = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=19b6b8e66066ceceeddf41a7b1b7f8b3&units=imperial`
    $.ajax({
        url: urlKey,
        method: 'GET'
    }).then(function (response) {
        for (i = 0; i < 5; i++) {
            //cardDiv and cardSection are Foundation elements to make the cards show properly
            let cardDiv = $('<div class="cell medium-auto">')
            let card = $('<div class="card forecast">');
            cardDiv.append(card)
            card.append($('<h4 class="card-divider">').text(moment.unix(response.daily[i].dt).format("MM/DD/YYYY")));
            let cardSection = $('<div class="card-section">')
            card.append(cardSection)
            cardSection.append($(`<img src="http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png">`));
            cardSection.append($('<p>').text(`Temp: ${response.daily[i].temp.day}\xB0F`));
            cardSection.append($('<p>').text(`Humidity: ${response.daily[i].humidity}%`));
            $('#forecast').append(cardDiv);
        }
    })
}

// get current weather
let getCurrent = (cityName) => {
    let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19b6b8e66066ceceeddf41a7b1b7f8b3&units=imperial`
    $.ajax({
        url: urlKey,
        method: 'GET'
    }).then(function (response) {
        lat = response.coord.lat;
        lon = response.coord.lon;
        let cityTitle = $('<h2>').text(`${cityName} (${moment().format('MM')}/${moment().format('DD')}/${moment().format('YYYY')})`);
        $('#current-weather').append(cityTitle);
        let icon = $(`<img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">`);
        $('#current-weather').append(icon);
        $('#current-weather').append($('<div class="cell">').text(`Temperature: ${response.main.temp} \xB0F`));
        $('#current-weather').append($('<div class="cell">').text(`Humidity: ${response.main.humidity}%`));
        $('#current-weather').append($('<div class="cell">').text(`Wind speed: ${response.wind.speed} MPH`));
        getUv();
        getForecast();    
    })

}

//render past searches and the last searched city weather info
if (localStorage.getItem('cityHistory')) {
    storedCities = JSON.parse(localStorage.getItem('cityHistory'))
    renderHistory();
    getCurrent(storedCities[0]);
}

// Listen to search button click
$('#search').click((event) => {
    event.preventDefault();
    let inputCity = $('#city-search').val();
    $('#city-search').val('');
    if (inputCity) {
        $('#current-weather').empty();
        $('#forecast').empty();
        getCurrent(inputCity);
        storeSearches(inputCity);
    }
})

//Listen to history buttons too
$(document).on("click", ".history", function () {
    let chosenCity = $(this).attr('data-name')
    $('#current-weather').empty();
    $('#forecast').empty();
    getCurrent(chosenCity);
})