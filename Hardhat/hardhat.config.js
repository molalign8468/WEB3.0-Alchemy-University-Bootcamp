require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

const ALCHEMY_HOLESKY_URL = process.env.ALCHEMY_HOLESKY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!ALCHEMY_HOLESKY_URL) {
  console.warn(
    "ALCHEMY_HOLESKY_URL not found in .env. Holesky network will not be configured."
  );
}
if (!PRIVATE_KEY) {
  console.warn(
    "PRIVATE_KEY not found in .env. Holesky network accounts will not be configured."
  );
}

module.exports = {
  solidity: "0.8.28", // Or whatever version your contracts use
  networks: {
    holesky: {
      url: ALCHEMY_HOLESKY_URL || "", // Provide a default empty string if not found
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [], // Only add if private key exists
      chainId: 17000, // Explicitly set Holesky Chain ID
    },
    // You can add other networks here like sepolia, mainnet, etc.
  },
  // If you plan to verify on Holesky Etherscan, add this section:
};
