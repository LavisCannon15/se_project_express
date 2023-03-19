import "./SideBar.css";
import React from "react";

import avatarImage from "../../images/user_avatar.svg";

export default function SideBar({
  setIsProfileModalOpen,
  handleSignOut,
  currentUser
}) {


   const handleEditProfileClick = () => {
     setIsProfileModalOpen({ isOpen: true });
   };


  return (
    <div className="profile__menu">
      <li className="profile__user-info">
        <p className="profile__user-name">
          <img
            className="profile__user-avatar"
            src={
              currentUser && currentUser.avatar
                ? currentUser.avatar
                : avatarImage
            }
            alt="User avatar"
          />
          {currentUser && currentUser.name ? currentUser.name : "name"}
        </p>
      </li>

      <li>
        <p className="profile__change-info" onClick={handleEditProfileClick}>
          Change profile data
        </p>
      </li>
      <li>
        <p className="profile__logout" onClick={handleSignOut}>
          Log out
        </p>
      </li>
    </div>
  );
}
