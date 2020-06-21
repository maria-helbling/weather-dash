# Weather dashboard

A weather dashboard that runs in the browser and features dynamically updated HTML and CSS.
The live version can be [found here](https://maria-helbling.github.io/weather-dash/).

The dashboard is on one page and visible here:

![screenshot of dashboard](assets/images/screenshot.PNG)

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```
## Build

* The site is built using Foundation.
   * The use of Foundation XY grid minimises the need for media queries for responsiveness.
   * See [Foundation documentation](https://get.foundation/sites/docs/) for customising the site with their provided options.
* jQuery powers the dynamic HTML and CSS behind the scenes.
* [OpenWeather API](https://openweathermap.org/api) is used to retrieve current and forecast weather data for cities. 
* The dashboard utilises local storage to record search history.

## Setup

To clone the repo:
```
git clone https://github.com/maria-helbling/weather-dash.git
``` 

## Credits

The css design was provided by client.

## License

Built by Maria Helbling
This application is released under [MIT](assets/LICENSE.txt) license.

## Contributing

To contribute to this application, create a pull request.
Here are the steps needed for doing that:
- Fork the repo
- Create a feature branch (git checkout -b NAME-HERE)
- Commit your new feature (git commit -m 'Add some feature')
- Push your branch (git push)
- Create a new Pull Request

Following a code review, your feature will be merged.

