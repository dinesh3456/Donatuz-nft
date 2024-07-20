import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  useActiveAccount,
  useSendTransaction,
  useReadContract,
  MediaRenderer,
  TransactionButton,
} from "thirdweb/react";
import { getContract, toEther } from "thirdweb";
import { openEditionContract } from "../utils/constants";
import {
  claimTo,
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc721";
import { getContractMetadata } from "thirdweb/extensions/common";
import "../styles/Participate.css";

function Participate() {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isFollowingX, setIsFollowingX] = useState(false);
  const [isFollowingTelegram, setIsFollowingTelegram] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [mintingError, setMintingError] = useState(null);
  const [isMintingComplete, setIsMintingComplete] = useState(false);
  const [mintedNftUrl, setMintedNftUrl] = useState("");
  const [quantity, setQuantity] = useState(1);

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

  const handleFollowX = () => {
    console.log("Following X");
    window.open("https://x.com/Donatuz_", "_blank");
    setIsFollowingX(true);
  };

  const handleFollowTelegram = () => {
    console.log("Following Telegram");
    window.open("https://t.me/donatuzz", "_blank");
    setIsFollowingTelegram(true);
  };

  const getPrice = (quantity) => {
    const total =
      quantity * parseInt(claimCondition?.pricePerToken.toString() || "0");
    return toEther(BigInt(total));
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="gradient-bg"></div>
      <div className="participate">
        <h2>SPATHION - TrueFans NFT giveaway</h2>
        <p>Active • Feb 11th 23, 8:00 pm ~ Mar 1st 23, 11:59 pm</p>
        <p>
          Spread love this Valentine's Day with SPATHION "Proof of Love" NFT
          giveaway! Engage, and celebrate with us to get chance to win 10,000$
          worth SPATO tokens Airdrop.
        </p>
        <div className="social-buttons">
          <button
            onClick={handleFollowX}
            className={`social-button ${isFollowingX ? "followed" : ""}`}
          >
            {isFollowingX ? "Followed Donatuz on X" : "Follow Donatuz on X"}
          </button>
          <button
            onClick={handleFollowTelegram}
            className={`social-button ${isFollowingTelegram ? "followed" : ""}`}
          >
            {isFollowingTelegram
              ? "Followed Donatuz on Telegram"
              : "Follow Donatuz on Telegram"}
          </button>
        </div>
        <div className="nft-info">
          {isContractMetadataLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <MediaRenderer
                client={window.client}
                src={contractMetadata?.image}
                className="nft-image"
              />
              <h2>{contractMetadata?.name}</h2>
              <p>{contractMetadata?.description}</p>
            </>
          )}
          {isClaimedSupplyLoading || isTotalSupplyLoading ? (
            <p>Loading...</p>
          ) : (
            <p>Total NFT Minted: {claimedSupply?.toString()}</p>
          )}
        </div>
        <div className="mint-section">
          <h3>Mint Your Donatuz NFT</h3>

          <TransactionButton
            transaction={() =>
              claimTo({
                contract: contract,
                to: account?.address || "",
                quantity: BigInt(1),
              })
            }
            onTransactionConfirmed={(result) => {
              alert("NFT Claimed!");
              setQuantity(1);
              setIsMintingComplete(true);
              setMintedNftUrl(/* URL of the minted NFT image */);
              console.log("Transaction confirmed:", result);
              console.log("Transaction hash:", result.transactionHash);
              console.log("Block number:", result.blockNumber);
              console.log("From address:", result.from);
              console.log("To address:", result.to);
              console.log("Gas used:", result.gasUsed.toString());

              const mintedNftUrl =
                "https://ipfs.io/ipfs/QmUcFE8QCxefqdxfBx1DvBzFeWQVHhpx6EiDMwkaq3tjuZ";
              navigate("/final", { state: { nftImageUrl: mintedNftUrl } });
            }}
            disabled={!isFollowingX || !isFollowingTelegram}
          >
            {`Claim NFT`}
          </TransactionButton>
          {mintingError && <p className="error-message">{mintingError}</p>}
        </div>
      </div>
    </>
  );
}

export default Participate;
