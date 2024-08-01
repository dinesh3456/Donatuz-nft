import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const MintingProgressPopup = ({ isVisible, onCountdownComplete }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.log("MintingProgressPopup isVisible:", isVisible);
    let timer;
    if (isVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onCountdownComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVisible, countdown, onCountdownComplete]);

  useEffect(() => {
    if (isVisible) {
      setCountdown(10);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-indigo-800 text-white rounded-lg shadow-lg p-4 flex items-center space-x-4 max-w-md w-full relative z-50">
        <div className="bg-blue-500 rounded-full p-2">
          <Loader2 className="animate-spin" size={24} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg">Minting in progress</p>
          <p className="text-sm">Please wait while we mint your NFT</p>
          <div className="mt-2 bg-indigo-600 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-400 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 10) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs mt-1 text-right">{countdown}s</p>
        </div>
      </div>
    </div>
  );
};

export default MintingProgressPopup;
