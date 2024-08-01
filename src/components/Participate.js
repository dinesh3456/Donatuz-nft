/* global BigInt */
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  useActiveAccount,
  useReadContract,
  TransactionButton,
} from "thirdweb/react";
import { toEther } from "thirdweb";
import { openEditionContract } from "../utils/constants";
import {
  claimTo,
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc721";
import { getContractMetadata } from "thirdweb/extensions/common";
import { XIcon, TelegramIcon, TickIcon } from "../assets/svg/symbols.js";
import NFTMintingPopup from "./Alert";
import MintingProgressPopup from "./MintingProgressPopup";

const SocialButton = ({ onClick, isFollowed, platform }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-3 sm:px-4 py-2 sm:py-3 mt-3 text-white rounded-lg bg-[#252942] hover:bg-opacity-80 transition-all duration-300"
  >
    <div className="flex items-center">
      <span className="mr-2 sm:mr-3">
        {platform === "X" ? (
          <XIcon width={32} height={32} />
        ) : (
          <TelegramIcon width={32} height={32} />
        )}
      </span>
      <span className="text-sm sm:text-base">{`Follow Donatuz on ${platform}`}</span>
    </div>
    {isFollowed ? (
      <TickIcon width={24} height={24} />
    ) : (
      <span className="bg-[#4E5EE4] px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm">
        Follow
      </span>
    )}
  </button>
);

function Participate() {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isFollowingX, setIsFollowingX] = useState(false);
  const [isFollowingTelegram, setIsFollowingTelegram] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [mintingError, setMintingError] = useState(null);
  const [quantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [showMintingPopup, setShowMintingPopup] = useState(false);
  const [mintingComplete, setMintingComplete] = useState(false);

  const [popupState, setPopupState] = useState({
    isVisible: false,
    message: "",
    details: "",
    type: "success",
  });
  const contract = openEditionContract;

  const { data: contractMetadata, isLoading: isContractMetadataLoading } =
    useReadContract(getContractMetadata, { contract: contract });

  const { data: claimedSupply, isLoading: isClaimedSupplyLoading } =
    useReadContract(getTotalClaimedSupply, { contract: contract });

  const { data: totalNFTSupply, isLoading: isTotalSupplyLoading } =
    useReadContract(nextTokenIdToMint, { contract: contract });

  const { data: claimCondition } = useReadContract(getActiveClaimCondition, {
    contract: contract,
  });

  useEffect(() => {
    if (!account) {
      setRedirectToHome(true);
    }
  }, [account]);

  useEffect(() => {
    console.log("isMinting state changed:", isMinting);
  }, [isMinting]);

  useEffect(() => {
    console.log("showMintingPopup state changed:", showMintingPopup);
  }, [showMintingPopup]);

  const handleFollowX = useCallback(() => {
    window.open("https://x.com/Donatuz_", "_blank");
    setIsFollowingX(true);
  }, []);

  const handleFollowTelegram = useCallback(() => {
    window.open("https://t.me/donatuzz", "_blank");
    setIsFollowingTelegram(true);
  }, []);

  const getPrice = useCallback(
    (quantity) => {
      const total =
        quantity * parseInt(claimCondition?.pricePerToken.toString() || "0");
      return toEther(BigInt(total));
    },
    [claimCondition]
  );

  const handleStartMinting = useCallback(() => {
    console.log("Starting minting process");
    setIsMinting(true);
    setShowMintingPopup(true);
  }, []);

  const handleMintingComplete = useCallback(
    (result) => {
      console.log("Minting process complete");
      setMintingComplete(true);
      setIsMinting(false);
      setPopupState({
        isVisible: true,
        message: "NFT Claimed Successfully!",
        details: `Transaction Hash: ${result.transactionHash.slice(0, 10)}...`,
        type: "success",
      });
      console.log("Transaction confirmed:", result);
      console.log("Transaction hash:", result.transactionHash);
      console.log("Block number:", result.blockNumber);
      console.log("From address:", result.from);
      console.log("To address:", result.to);
      console.log("Gas used:", result.gasUsed.toString());
    },
    [setPopupState]
  );

  const handleCountdownComplete = useCallback(() => {
    console.log("Countdown complete");
    setShowMintingPopup(false);
  }, []);

  useEffect(() => {
    if (mintingComplete && !showMintingPopup) {
      console.log("Navigating to final page");
      const mintedNftUrl =
        "https://ipfs.io/ipfs/QmUcFE8QCxefqdxfBx1DvBzFeWQVHhpx6EiDMwkaq3tjuZ";
      navigate("/final", { state: { nftImageUrl: mintedNftUrl } });
    }
  }, [mintingComplete, showMintingPopup, navigate]);

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          {isFollowingX && isFollowingTelegram
            ? "SPATHION - TrueFans NFT giveaway"
            : "Donatuz Whale - Early Adopter NFT Mint"}
        </h1>
        {isFollowingX && isFollowingTelegram && (
          <p className="text-center mb-4 flex flex-wrap items-center justify-center text-white text-sm sm:text-base">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="mr-2">Active</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Feb 11th 23, 8:00 pm ~ Mar 1st 23, 11:59 pm</span>
          </p>
        )}
        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center max-w-2xl mx-auto text-white">
          Spread love this Valentine's Day with SPATHION "Proof of Love" NFT
          giveaway! Engage, and celebrate with us to get chance to win 10,000$
          worth SPATO tokens Airdrop.
        </p>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center max-w-2xl mx-auto text-white">
          NFT holders can join SPATHION TRUE FANS club and claim token airdrop
          at TGE.
        </p>

        <div className="max-w-md mx-auto">
          <SocialButton
            onClick={handleFollowX}
            isFollowed={isFollowingX}
            platform="X"
          />
          <SocialButton
            onClick={handleFollowTelegram}
            isFollowed={isFollowingTelegram}
            platform="Telegram"
          />

          <div className="mt-6 sm:mt-8 bg-[#252942] p-4 sm:p-6 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 text-white">
              Mint Your Donatuz NFT
            </h3>
            <div className="flex justify-center">
              <TransactionButton
                transaction={() =>
                  claimTo({
                    contract: contract,
                    to: account?.address || "",
                    quantity: BigInt(quantity),
                  })
                }
                onSubmit={() => {
                  console.log("Transaction submitted");
                }}
                onError={(error) => {
                  console.error("Minting error:", error);
                  setIsMinting(false);
                  setShowMintingPopup(false);
                  setPopupState({
                    isVisible: true,
                    message: "Minting Failed",
                    details: "You have already minted the NFT!",
                    type: "error",
                  });
                }}
                onTransactionConfirmed={handleMintingComplete}
                disabled={!isFollowingX || !isFollowingTelegram || isMinting}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold !text-white ${
                  isFollowingX && isFollowingTelegram && !isMinting
                    ? "!bg-[#504DFB] hover:!bg-opacity-80"
                    : "!bg-[#ddad27] hover:!bg-opacity-80 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!isMinting) {
                    handleStartMinting();
                  }
                }}
              >
                {isFollowingX && isFollowingTelegram
                  ? isMinting
                    ? "Minting..."
                    : "Claim NFT"
                  : "Start Minting"}
              </TransactionButton>
            </div>
          </div>
        </div>

        {mintingError && (
          <div className="mt-4 p-3 sm:p-4 bg-red-500 text-white rounded-lg text-sm sm:text-base">
            {mintingError}
          </div>
        )}
      </div>
      <NFTMintingPopup
        message={popupState.message}
        details={popupState.details}
        type={popupState.type}
        isVisible={popupState.isVisible}
        onClose={() => setPopupState((prev) => ({ ...prev, isVisible: false }))}
      />
      <MintingProgressPopup
        isVisible={showMintingPopup}
        onCountdownComplete={handleCountdownComplete}
      />
    </div>
  );
}

export default Participate;
