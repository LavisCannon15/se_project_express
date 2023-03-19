import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./LoginModal.css";

export default function LoginModal({ isLoginModalOpen, setIsLoginModalOpen, handleSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSignIn(email, password);
  };

  const closeModalOnButtonClick = () => {
    setIsLoginModalOpen({ isOpen: false });
  };

  return (
    <ModalWithForm
      title="Login"
      name="loginForm"
      buttonText="Log in"
      onClose={closeModalOnButtonClick}
      isFormModalOpen={isLoginModalOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__form-fieldset">
        <label className="modal__label">
          <h3 className="modal__form-input-title">Email</h3>
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
          <h3 className="modal__form-input-title">Password</h3>
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
      </fieldset>
    </ModalWithForm>
  );
}
