import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia, sepolia, defineChain } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";

// Replace this with your client ID string
const clientId = "65c5e37cd7bcab997368ba6c11c9dadf";

//secret key : WnAzDgGmnUuaRlpZW8wUqA18BMeCu0TQOgyOeC1RuZBUHl_At29ucMsg0i4OVwbAF0niZb-cXy8gqn_Pp48QRw

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = defineChain(42026);
export const openEditionDropAddress =
  "0x14342fbe2fe9ebf89aF94dE47298Ef742eEF95C5";
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
