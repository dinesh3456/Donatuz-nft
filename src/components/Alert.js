import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

const NFTMintingPopup = ({ message, details, type, isVisible, onClose }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
        setTimeout(onClose, 500); // Wait for fade out animation before calling onClose
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !isActive) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 flex justify-center items-center p-4 transition-transform duration-300 ease-in-out ${
        isActive ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-indigo-800 text-white rounded-lg shadow-lg p-4 flex items-center space-x-4 max-w-md w-full">
        <div
          className={`${
            type === "success" ? "bg-green-500" : "bg-red-500"
          } rounded-full p-2`}
        >
          {type === "success" ? <Check size={24} /> : <X size={24} />}
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg">{message}</p>
          <p className="text-sm">{details}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTMintingPopup;
