import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia, sepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";

// Replace this with your client ID string
const clientId = "0f3c67dbd4285fccbb65d02953f0bfd4";

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = baseSepolia;
export const openEditionDropAddress =
  "0xD29EC14ceEC715b05301fC7D2ECF970B2A10f3C0";
export const editionDropTokenId = 0n;

export const openEditionContract = getContract({
  address: openEditionDropAddress,
  chain,
  client,
});

export const accountAbstraction = {
  chain,
  sponsorGas: true,
};

export const wallets = [
  inAppWallet({
    auth: {
      options: ["google"],
    },
  }),
];
