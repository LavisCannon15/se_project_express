import { Link } from "react-router-dom";

import "./Header.css";
import avatarImage from "../../images/user_avatar.svg";
import Logo from "../../images/wtwr_logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

export default function Header({
  currentWeather,
  setIsFormModalOpen,
  setIsRegisterModalOpen,
  setIsLoginModalOpen,
  isLoggedIn,
  currentUser,
}) {
  const handleAddClothesClick = () => {
    setIsFormModalOpen({ isOpen: true });
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen({ isOpen: true });
  };

  const handleSignupClick = () => {
    setIsRegisterModalOpen({ isOpen: true });
  };

  const userMenu = isLoggedIn ? (
    <div className="header__user-menu">
      <li>
        <ToggleSwitch />
      </li>
      <li>
        <p className="header__clothes-button" onClick={handleAddClothesClick}>
          + Add clothes
        </p>
      </li>
      <li>
        <Link to={"/profile"} className="header__profile-link">
          <p className="header__user-info">
            {currentUser && currentUser.name ? currentUser.name : "name"}
            <img
              src={
                currentUser && currentUser.avatar
                  ? currentUser.avatar
                  : avatarImage
              }
              alt="user avatar"
              className="header__user-avatar"
            />
          </p>
        </Link>
      </li>
    </div>
  ) : (
    <div className="header__auth-menu">
      <li>
        <p className="header__login-button" onClick={handleLoginClick}>
          Log In
        </p>
      </li>
      <li>
        <p className="header__signup-button" onClick={handleSignupClick}>
          Sign Up
        </p>
      </li>
    </div>
  );

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo-date-location">
          <Link to={"/"}>
            <img className="header__logo" src={Logo} alt="wtwr logo" />
          </Link>
          <p className="header__date-location">
            {currentDate + ", " + currentWeather.city}
          </p>
        </div>
        {userMenu}
      </div>
    </header>
  );
}
