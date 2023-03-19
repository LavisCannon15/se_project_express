import { useState, useContext, useEffect } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {


  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");

  const [fahrenheitColor, setFahrenheitColor] = useState("");
  const [celciusColor, setCelciusColor] = useState("");


    useEffect(
      () => setIsChecked(currentTemperatureUnit === "C"),
      [currentTemperatureUnit]
    );

    useEffect(() => {
      if (currentTemperatureUnit === "F") {
        setFahrenheitColor("white");
      } else {
        setFahrenheitColor("#7e7e7e");
      }
    }, [currentTemperatureUnit]);

    useEffect(() => {
      if (currentTemperatureUnit === "C") {
        setCelciusColor("white");
      } else {
        setCelciusColor("#7e7e7e");
      }
    }, [currentTemperatureUnit]);



  return (
    <div className="toggle__switch">
      <label className="toggle__switch-label">
        <p
          className="toggle__switch-label-fahrenheit"
          style={{ color: fahrenheitColor }}
        >
          F
        </p>
        <p
          className="toggle__switch-label-celcius"
          style={{ color: celciusColor }}
        >
          C
        </p>

        <input
          className="toggle__switch-checkbox"
          type="checkbox"
          id="toggle-switch-checkbox"
          value={currentTemperatureUnit}
          onChange={handleToggleSwitchChange}
          checked={isChecked}
        />
        <span className="toggle__switch-button"> </span>
      </label>
    </div>
  );
}
