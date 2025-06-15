import React from "react";
import { Utils } from "alchemy-sdk";

const AddressDetails = ({ addressData, onSearch }) => {
  const formatEth = (wei) => {
    return parseFloat(Utils.formatEther(wei)).toFixed(4);
  };

  const formatTokenValue = (value) => {
    return parseFloat(value).toFixed(4);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mx-auto max-w-4xl mt-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 font-inter">
        Address Details
      </h2>
      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <p className="font-semibold text-gray-600 w-40">Address:</p>
          <p className="text-gray-800 break-all">{addressData.address}</p>
        </div>
        <div className="flex items-center">
          <p className="font-semibold text-gray-600 w-40">Balance (ETH):</p>
          <p className="text-gray-800">{formatEth(addressData.balance)} ETH</p>
        </div>
        <div className="flex items-center">
          <p className="font-semibold text-gray-600 w-40">
            Total Transactions:
          </p>
          <p className="text-gray-800">
            {addressData.transactions?.length || 0}
          </p>
        </div>
      </div>

      {addressData.tokenBalances && addressData.tokenBalances.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 font-inter">
            Token Balances
          </h3>
          <ul className="space-y-2">
            {addressData.tokenBalances.map((token, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
              >
                <span className="font-medium text-gray-700 break-all pr-2">
                  {token.contractAddress.substring(0, 12)}...
                </span>
                <span className="text-blue-600 font-semibold">
                  {formatTokenValue(token.tokenBalance)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {addressData.transactions && addressData.transactions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 font-inter">
            Recent Transactions
          </h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Txn Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Block
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {addressData.transactions.map((tx, index) => {
                  const isEth = tx.asset === null || tx.asset === "ETH";
                  const displayValue =
                    isEth && tx.value
                      ? `${formatEth(tx.value)} ETH`
                      : tx.value
                      ? `${formatTokenValue(tx.value)} ${tx.asset || ""}`
                      : "NFT";

                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline">
                        <button
                          onClick={() => onSearch(tx.hash)}
                          className="break-all text-left"
                        >
                          {tx.hash.substring(0, 10)}...
                          {tx.hash.substring(tx.hash.length - 8)}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                        <button
                          onClick={() => onSearch(parseInt(tx.blockNum, 16))}
                          className="text-left"
                        >
                          {parseInt(tx.blockNum, 16)}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                        <button
                          onClick={() => onSearch(tx.from)}
                          className="break-all text-left"
                        >
                          {tx.from.substring(0, 10)}...
                          {tx.from.substring(tx.from.length - 8)}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                        <button
                          onClick={() => onSearch(tx.to)}
                          className="break-all text-left"
                        >
                          {tx.to?.substring(0, 10)}...
                          {tx.to?.substring(tx.to.length - 8)}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {displayValue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {tx.asset || "ETH"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressDetails;
