import "./Profile.css";
import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  setIsItemModalOpen,
  setIsFormModalOpen,
  setClickedItem,
  filteredApiItems,
  setIsProfileModalOpen,
  handleSignOut,
  onCardLike,
  currentUser,
  clickedItem
}) {
  return (
    <div className="profile">
      <SideBar
        setIsProfileModalOpen={setIsProfileModalOpen}
        handleSignOut={handleSignOut}
        currentUser={currentUser}
      />
      <ClothesSection
        setIsItemModalOpen={setIsItemModalOpen}
        setIsFormModalOpen={setIsFormModalOpen}
        setClickedItem={setClickedItem}
        filteredApiItems={filteredApiItems}
        onCardLike={onCardLike}
        currentUser={currentUser}
        clickedItem={clickedItem}
      />
    </div>
  );
}
