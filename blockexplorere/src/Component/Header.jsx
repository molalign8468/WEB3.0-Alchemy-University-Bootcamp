import React, { useState, useEffect } from "react";

const Header = () => (
  <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-b-lg shadow-lg text-center">
    <h1 className="text-4xl font-extrabold tracking-tight font-inter">
      Ethereum Blockchain Explorer
    </h1>
    <p className="mt-2 text-lg opacity-90">
      Explore the decentralized world of Ethereum
    </p>
  </header>
);
export default Header;
