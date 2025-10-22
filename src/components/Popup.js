// src/components/Popup.js
import React from "react";
import "../css/Popup.css";

export default function Popup({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="popup-close" onClick={onClose}>×</button>
        <p>{message}</p>
      </div>
    </div>
  );
}
