require("dotenv").config();

const ethers = require("ethers");

const SmartContactAdress = "0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A";
const contractABI = [
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dec",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "inc",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const provider = new ethers.provider.AlchemyProvider(
  "goerli",
  process.env.ALCHEMY_API_KEY
);

const wallet = new ethers.Wallet(process.env.PRIVET_KEY, provider);

async function main() {
  const counterContract = new ethers.Contract(
    SmartContactAdress,
    contractABI,
    wallet
  );
  let tx = await counterContract.count();
  console.log(tx.hash);
  let currentCount = await counterContract.get();
  console.log(currentCount);
}
main();
