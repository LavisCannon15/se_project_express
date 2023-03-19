import {useContext} from "react";
import "./WeatherCard.css";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function WeatherCard({ currentWeather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);


    const currentTemp = () => {
      return currentTemperatureUnit === "F"
        ? currentWeather.temperatureF
        : currentWeather.temperatureC;
    };

  return (
    <section className="weather__card">
      <li>
        <p className="weather__card-temperature">
          {currentTemp() + " °" + currentTemperatureUnit}
        </p>
      </li>

      <li></li>
    </section>
  );
}
