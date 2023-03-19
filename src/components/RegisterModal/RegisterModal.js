import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./RegisterModal.css";

export default function RegisterModal({
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  handleSignUp,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSignUp(name, avatar, email, password);
  };

  const closeModalOnButtonClick = () => {
    setIsRegisterModalOpen({ isOpen: false });
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="registerForm"
      buttonText="Next"
      onClose={closeModalOnButtonClick}
      isFormModalOpen={isRegisterModalOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__form-fieldset">
        <label className="modal__label">
          <h3 className="modal__form-input-title">Email*</h3>
          <input
            type="text"
            className="modal__form-input modal__form-input-name"
            name="email"
            placeholder="Email"
            id="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <span className="modal__error" id="addEmail-error"></span>
        </label>

        <label className="modal__label">
          <h3 className="modal__form-input-title">Password*</h3>
          <input
            type="password"
            className="modal__form-input modal__form-input-link"
            name="password"
            placeholder="Password"
            id="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="modal__error" id="addPassword-error"></span>
        </label>

        <label className="modal__label">
          <h3 className="modal__form-input-title">Name*</h3>
          <input
            type="text"
            className="modal__form-input modal__form-input-link"
            name="name"
            placeholder="Name"
            id="name"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="modal__error" id="addName-error"></span>
        </label>

        <label className="modal__label">
          <h3 className="modal__form-input-title">Avatar URL</h3>
          <input
            type="url"
            className="modal__form-input modal__form-input-link"
            name="link"
            placeholder="Avatar URL"
            id="addLink"
            value={avatar}
            onChange={handleAvatarChange}
          />
          <span className="modal__error" id="addLink-error"></span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
