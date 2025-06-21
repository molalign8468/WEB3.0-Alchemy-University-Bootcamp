const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Holesky Counter Test", function () {
  it("Should interact with deployed contract", async function () {
    // Replace with your deployed address
    const counterAddress = "0x2d98e200A5A904516711c081BFe8163967FABa92";
    const Counter = await ethers.getContractFactory("Counter");
    const counter = Counter.attach(counterAddress);

    // Check initial state
    const initialCount = await counter.count();
    console.log("Initial count:", initialCount.toString());

    // Send transaction
    const tx = await counter.increment();
    await tx.wait();

    // Verify new state
    const newCount = await counter.count();
    expect(newCount).to.equal(initialCount + 1n);
  }).timeout(25000); // Increase timeout for testnet
});
