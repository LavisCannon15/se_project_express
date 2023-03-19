import "./ClothesSection.css";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";


export default function ClothesSection({
  setIsItemModalOpen,
  setIsFormModalOpen,
  setClickedItem,
  filteredApiItems,
  onCardLike,
  currentUser,
  clickedItem
}) {
  const handleAddClothesClick = () => {
    setIsFormModalOpen({ isOpen: true });
  };

  /*
  const filteredItems = apiItems.filter(
    (item) => item.weather === currentWeatherCard
  );
  */

  
   const currentUserItems = filteredApiItems.filter(
     (item) => item.id === currentUser.id
   );
   



  const CardList = ({
    currentUserItems,
    setIsItemModalOpen,
    setClickedItem,
    onCardLike,
    currentUser,
    clickedItem,
  }) => (
    <div className="profile__clothes-cards-list">
      {currentUserItems.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          setIsItemModalOpen={setIsItemModalOpen}
          setClickedItem={setClickedItem}
          onCardLike={onCardLike}
          currentUser={currentUser}
          clickedItem={clickedItem}
        />
      ))}
    </div>
  );

  return (
    <div className="profile__clothes">
      <div className="profile__clothes-header">
        <p className="profile__clothes-title">Your items</p>
        <p
          className="profile__clothes-add-button"
          onClick={handleAddClothesClick}
        >
          + Add new
        </p>
      </div>

      <CardList
        currentUserItems={currentUserItems}
        setIsItemModalOpen={setIsItemModalOpen}
        setClickedItem={setClickedItem}
        onCardLike={onCardLike}
        currentUser={currentUser}
        clickedItem={clickedItem}
      />
    </div>
  );
}
