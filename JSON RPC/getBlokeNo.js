import "dotenv/config";
import axios from "axios";

const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`;

async function getBlockNumber() {
  const response = await axios.post(url, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_blockNumber",
  });

  console.log(response.data.result);

  return response.data.result;
}
const geBalance = async (address) => {
  const response = await axios.post(url, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address],
  });
  console.log(response.data.result);
  return response.data.result;
};
getBlockNumber();
geBalance("0x825964B04eb5f4c6156dFD48dD1a70082eF2cd56");
