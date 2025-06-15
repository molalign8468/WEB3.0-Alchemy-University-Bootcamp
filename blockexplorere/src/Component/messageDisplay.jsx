import React, { useState, useEffect } from "react";

const MessageDisplay = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  const borderColor = type === "error" ? "border-red-600" : "border-green-600";

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center justify-between border ${borderColor}`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default MessageDisplay;
