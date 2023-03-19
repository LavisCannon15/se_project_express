import React from "react";


export default function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  isFormModalOpen,
  onSubmit,
  children,
}) {
  return (
    <div
      className={`modal ${
        isFormModalOpen.isOpen && "modal__opened"
      } modal__type-${name}`}
    >
      <form className="modal__form" name={name} onSubmit={onSubmit}>
        <button
          className="modal__exit-button"
          type="button"
          onClick={() => onClose()}
        />
        <h2 className="modal__title">{title}</h2>
        {children}
        <button className="modal__submit-button" type="submit" >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
