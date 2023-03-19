export const getForecastWeather = (location, APIkey) => {
  const parsedLocation = `${location.latitude}, ${location.longitude}`;
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterDataFromWeatherAPI = (data) => {
  if (!data) {
    return null;
  }

  const weather = {};
  weather.city = data.name;
  weather.temperatureF = Math.round(data.main.temp); //returns temperature in Fahrenheit default
  weather.temperatureC = Math.round((weather.temperatureF - 32) * (5 / 9));
  return weather;
};

//API Key: bd819e389592868e5cd65868e265238f

export const cardWeatherFilter = (data) => {
  if (data.main.temp >= 86) {
    return "hot";
  } else if (data.main.temp >= 66 && data.main.temp <= 85) {
    return "warm";
  } else if (data.main.temp <= 65) {
    return "cold";
  }
};
