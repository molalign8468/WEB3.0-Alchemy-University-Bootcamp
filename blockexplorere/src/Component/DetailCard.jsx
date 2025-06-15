import React, { useState, useEffect } from "react";

const DetailCard = ({ title, data, onSearch }) => (
  <div className="bg-white p-8 rounded-lg shadow-md mx-auto max-w-4xl mt-8 border border-gray-200">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 font-inter">
      {title}
    </h2>
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex items-center">
          <p className="font-semibold text-gray-600 w-40 capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}:
          </p>

          {key === "hash" ||
          key === "from" ||
          key === "to" ||
          key === "number" ||
          key === "miner" ? (
            <button
              onClick={() => onSearch(value)}
              className="text-blue-600 hover:underline break-all text-left"
            >
              {value}
            </button>
          ) : (
            <p className="text-gray-800 break-all">{value}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);
export default DetailCard;
