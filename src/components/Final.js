import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Final.css";
import donatuzLogo from "../assets/donatuz-logo.png"; // Make sure to have this logo in your assets

const Final = () => {
  const location = useLocation();
  const { nftImageUrl } = location.state || {};

  return (
    <div className="minted-nft-container">
      <header className="header">
        <img src={donatuzLogo} alt="Donatuz Logo" className="logo" />
      </header>
      <main className="main-content">
        <div className="nft-display">
          <div className="nft-frame">
            <div className="glow-effect"></div>
            <img src={nftImageUrl} alt="Minted NFT" className="nft-image" />
          </div>
        </div>
        <h1 className="welcome-text">
          Welcome to Donatuz Early Adopter Community
        </h1>
      </main>
    </div>
  );
};

export default Final;
