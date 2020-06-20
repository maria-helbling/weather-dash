// Listen to search key
$('#search').click((event)=>{
    event.preventDefault();
    let newCity = $('#city-search').val()
    $('#city-search').val('')
    console.log(newCity)
})

let getData = (cityName) => {
    let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19b6b8e66066ceceeddf41a7b1b7f8b3`

}