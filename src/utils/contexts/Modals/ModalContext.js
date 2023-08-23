import React, { createContext, useState } from "react";

const initialState = {
  step: 1,
};

export const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState({});
  const openModal = ({ type, details }) => {
    setIsOpen(true);
    setDetails(details);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        isOpen,
        closeModal,
        details,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
