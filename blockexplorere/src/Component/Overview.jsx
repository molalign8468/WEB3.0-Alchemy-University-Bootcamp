import React, { useState, useEffect } from "react";

const BlockchainOverview = ({ data, onSearch }) => (
  <div className="bg-white p-8 rounded-lg shadow-md mx-auto max-w-4xl mt-8 text-center border border-gray-200">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 font-inter">
      Network Overview
    </h2>
    {data ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 font-medium">Latest Block</p>
          <button
            onClick={() => onSearch(data.latestBlock)}
            className="text-xl font-bold text-blue-700 hover:underline mt-1"
          >
            {data.latestBlock}
          </button>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 font-medium">Avg. Gas Price</p>
          <p className="text-xl font-bold text-purple-700 mt-1">
            {data.averageGasPriceGwei} Gwei
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 font-medium">
            Total Transactions
          </p>
          <p className="text-xl font-bold text-green-700 mt-1">
            {data.totalTransactions}
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 font-medium">Network Hash Rate</p>
          <p className="text-xl font-bold text-yellow-700 mt-1">
            {data.networkHashRate}
          </p>
        </div>
      </div>
    ) : (
      <p className="text-gray-500">Loading network data...</p>
    )}
  </div>
);
export default BlockchainOverview;
