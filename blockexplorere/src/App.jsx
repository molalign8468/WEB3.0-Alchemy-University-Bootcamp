import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import Header from "./Component/Header";
import SearchBar from "./Component/SearchBar";
import MessageDisplay from "./Component/messageDisplay";
import BlockDetails from "./Component/BlockDitail";
import BlockchainOverview from "./Component/Overview";
import TransactionDetails from "./Component/Transaction";
import AddressDetails from "./Component/address";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const App = () => {
  const [view, setView] = useState("overview");
  const [overviewData, setOverviewData] = useState(null);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  useEffect(() => {
    const fetchOverview = async () => {
      setIsLoading(true);
      try {
        const [blockNumber, gasPrice] = await Promise.all([
          alchemy.core.getBlockNumber(),
          alchemy.core.getGasPrice(),
        ]);

        const block = await alchemy.core.getBlock(blockNumber);
        const data = {
          averageGasPriceGwei: parseInt(gasPrice.toString()) / 1e9,
          latestBlock: blockNumber,
          networkHashRate: block.difficulty.toString(),
          totalTransactions: block.transactions.length,
        };

        setOverviewData(data);
      } catch (error) {
        showMessage(`Failed to load overview: ${error.message}`, "error");
      }
      setIsLoading(false);
    };
    fetchOverview();
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setMessage("");
    setCurrentTransaction(null);
    setCurrentBlock(null);
    setCurrentAddress(null);

    try {
      if (query.startsWith("0x") && query.length === 66) {
        console.log(await alchemy.core.getTransaction(query));

        const tx = await alchemy.core.getTransaction(query);
        if (!tx) throw new Error("Transaction not found");

        setCurrentTransaction({
          value: tx.value.toString(),
          gasPrice: tx.gasPrice.toString(),
          gasLimit: tx.gasLimit.toString(),
          BlockNumber: tx.blockNumber,
          hash: tx.hash,
          From: tx.from,
          to: tx.to,
        });
        setView("transaction");
        showMessage("Transaction details loaded!");
      } else if (query.startsWith("0x") && query.length === 42) {
        setCurrentAddress({
          address: query,
          balance: await alchemy.core.getBalance(query),
          tokenBalances: await alchemy.core.getTokenBalances(query),
          transactions: await alchemy.core.getAssetTransfers({
            fromAddress: query,
            maxCount: 25,
            order: "desc",
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
          }),
        });
        console.log(currentAddress);
        setView("address");
        showMessage("Address details loaded!");
      } else if (!isNaN(query) && parseInt(query).toString() === query) {
        const block = await alchemy.core.getBlockWithTransactions(
          parseInt(query)
        );

        setCurrentBlock({
          baseFeePerGasGwei: parseInt(block.baseFeePerGas.toString()) / 1e9,
          difficulty: block.difficulty,
          gasLimit: parseInt(block.gasLimit.toString()),
          gasUsed: parseInt(block.gasUsed.toString()),
          hash: block.hash,
          miner: block.miner,
          timestamp: block.timestamp,
          totalDifficulty: parseInt(block._difficulty.toString()),
          transactionsCount: block.transactions.length,
          number: block.number,
        });
        setView("block");
        showMessage("Block details loaded!");
      } else {
        throw new Error("Invalid search query");
      }
    } catch (error) {
      showMessage(
        error.message.includes("Invalid")
          ? "Invalid search query. Please enter valid TxHash, Block #, or Address."
          : `Error fetching data: ${error.message}`,
        "error"
      );
      setView("overview");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-900 pb-10">
      <Header />
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && (
        <div className="text-center mt-8 p-4 text-blue-600 font-semibold text-lg">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mr-3"></div>
          Loading data...
        </div>
      )}

      <MessageDisplay
        message={message}
        type={messageType}
        onClose={() => setMessage("")}
      />

      <main className="container mx-auto px-4">
        {view === "overview" && overviewData && !isLoading && (
          <BlockchainOverview data={overviewData} onSearch={handleSearch} />
        )}
        {view === "transaction" && currentTransaction && !isLoading && (
          <TransactionDetails tx={currentTransaction} onSearch={handleSearch} />
        )}
        {view === "block" && currentBlock && !isLoading && (
          <BlockDetails block={currentBlock} onSearch={handleSearch} />
        )}
        {view === "address" && currentAddress && !isLoading && (
          <AddressDetails
            addressData={currentAddress}
            onSearch={handleSearch}
          />
        )}

        {!isLoading && !overviewData && view === "overview" && !message && (
          <p className="text-center mt-8 text-gray-500">
            No network overview data available. Please try searching for a
            transaction, block, or address.
          </p>
        )}
      </main>
    </div>
  );
};

export default App;
