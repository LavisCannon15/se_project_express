import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./AddItemModal.css";

export default function AddItemModal({
  isFormModalOpen,
  setIsFormModalOpen,
  addItem,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleWeatherChange = (event) => {
    setWeather(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addItem(name, imageUrl, weather);
  };

  const closeModalOnButtonClick = () => {
    setIsFormModalOpen({ isOpen: false });
  };

  return (
    <ModalWithForm
      title="New garment"
      name="addClothesForm"
      buttonText="Add garment"
      onClose={closeModalOnButtonClick}
      isFormModalOpen={isFormModalOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__form-fieldset">
        <label className="modal__label">
          <h3 className="modal__form-input-title">Name</h3>
          <input
            type="text"
            className="modal__form-input modal__form-input-name"
            name="name"
            placeholder="Name"
            id="name"
            minLength="1"
            maxLength="30"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="modal__error" id="addName-error"></span>
        </label>

        <label className="modal__label">
          <h3 className="modal__form-input-title">Image</h3>
          <input
            type="url"
            className="modal__form-input modal__form-input-link"
            name="link"
            placeholder="Image URL"
            id="addLink"
            required
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          <span className="modal__error" id="addLink-error"></span>
        </label>
      </fieldset>

      <fieldset className="modal__form-fieldset modal__form-fieldset_type_checkbox">
        <h3 className="modal__form-input-title">Select the weather type:</h3>

        <div className="modal__form-input_checkbox">
          <input
            type="radio"
            className="modal__form-input modal__form-input_type_checkbox"
            name="weather"
            id="hotCheckbox"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          <label htmlFor="hotCheckbox" className="modal__form-checkbox-name">
            Hot
          </label>
        </div>

        <div className="modal__form-input_checkbox">
          <input
            type="radio"
            className="modal__form-input modal__form-input_type_checkbox"
            name="weather"
            id="warmCheckbox"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          <label htmlFor="warmCheckbox" className="modal__form-checkbox-name">
            Warm
          </label>
        </div>

        <div className="modal__form-input_checkbox">
          <input
            type="radio"
            className="modal__form-input modal__form-input_type_checkbox"
            name="weather"
            id="coldCheckbox"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          <label htmlFor="coldCheckbox" className="modal__form-checkbox-name">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
