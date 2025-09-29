import React, { useState } from "react";

function PopupExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      {/* Button to open popup */}
      <button onClick={() => setIsOpen(true)}>
        Open Popup
      </button>

      {/* Popup overlay */}
      {isOpen && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {/* Popup content */}
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "250px",
            textAlign: "center"
          }}>
            <h3>Popup Content</h3>
            <p>This is a simple popup box.</p>
            <button onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupExample;
