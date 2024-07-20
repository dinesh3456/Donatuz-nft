import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia, sepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";

// Replace this with your client ID string
const clientId = "b492a3e50399e9278ec5617b45d81d38";

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
