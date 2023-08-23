import React, { useState, useRef } from "react";

const CustomModal = ({ hideModal, children }) => {
  const backdropRef = useRef(null);

  return (
    <div
      className="fixed inset-0 overflow-auto bg-gray-900 bg-opacity-50 p-7 flex justify-center items-center"
      ref={backdropRef}
      style={{ zIndex: "500" }}
    >
      <div
        className="rounded-lg w-full mx-auto bg-white"
        style={{ maxWidth: "600px" }}
      >
        {children}
        <div className="flex items-center justify-end w-full">
          <button
            className="text-xs px-3 border border-customOrange bg-customOrange text-white py-1 rounded overflow-hidden"
            onClick={() => {
              hideModal(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
