const { providers } = require("ethers");
const Ganache = require("ganache");

const ganacheProvider = Ganache.provider({
  wallet: { accounts: [{ balance: "1000000000000000000000" }] },
});

module.exports = { ganacheProvider };
