// test/faucet.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat"); // Keep this import

describe("Faucet", function () {
  let Faucet;
  let faucet;
  let owner;
  let user1;
  let user2;

  let MAX_WITHDRAW_CODE_LIMIT;
  let OVER_LIMIT_AMOUNT;
  let VALID_WITHDRAW_AMOUNT;
  let FAUCET_INITIAL_FUND_AMOUNT;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    MAX_WITHDRAW_CODE_LIMIT = ethers.utils.parseEther("0.001");
    OVER_LIMIT_AMOUNT = ethers.utils.parseEther("0.001000000000000001");
    VALID_WITHDRAW_AMOUNT = ethers.utils.parseEther("0.0005");
    FAUCET_INITIAL_FUND_AMOUNT = ethers.utils.parseEther("10");

    Faucet = await ethers.getContractFactory("Faucet");
    faucet = await Faucet.deploy();
    await faucet.deployed();

    await owner.sendTransaction({
      to: faucet.address,
      value: FAUCET_INITIAL_FUND_AMOUNT,
    });
  });

  describe("Constructor", function () {
    it("Should set the deployer as the owner", async function () {
      expect(await faucet.owner()).to.equal(owner.address);
    });

    it("Should be able to receive initial ETH during deployment (if constructor is payable)", async function () {
      const FaucetWithFunds = await ethers.getContractFactory("Faucet");
      const faucet2 = await FaucetWithFunds.deploy({
        value: ethers.utils.parseEther("1"),
      });
      await faucet2.deployed();
      expect(await ethers.provider.getBalance(faucet2.address)).to.equal(
        ethers.utils.parseEther("1")
      );
    });
  });

  describe("withdraw()", function () {
    it("Should allow a user to successfully withdraw a valid amount", async function () {
      const userBalanceBefore = await ethers.provider.getBalance(user1.address);
      const faucetBalanceBefore = await ethers.provider.getBalance(
        faucet.address
      );

      const tx = await faucet.connect(user1).withdraw(VALID_WITHDRAW_AMOUNT);
      const receipt = await tx.wait();

      const userBalanceAfter = await ethers.provider.getBalance(user1.address);
      const faucetBalanceAfter = await ethers.provider.getBalance(
        faucet.address
      );

      const gasCost = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      expect(userBalanceAfter).to.be.closeTo(
        userBalanceBefore.add(VALID_WITHDRAW_AMOUNT).sub(gasCost),
        ethers.utils.parseEther("0.000001")
      );

      expect(faucetBalanceAfter).to.equal(
        faucetBalanceBefore.sub(VALID_WITHDRAW_AMOUNT)
      );
    });

    it("Should revert if withdrawal amount exceeds the 0.001 ETH code limit", async function () {
      await expect(
        faucet.connect(user1).withdraw(OVER_LIMIT_AMOUNT)
      ).to.be.revertedWith("user can only withdraw .1 ETH and Blow");
    });

    it("Should revert if faucet has insufficient balance for withdrawal", async function () {
      await faucet.connect(owner).withdrawAll();
      expect(await ethers.provider.getBalance(faucet.address)).to.equal(0);

      await expect(
        faucet.connect(user1).withdraw(VALID_WITHDRAW_AMOUNT)
      ).to.be.revertedWith("Failed to send Ether");
    });

    it("Should allow withdrawing 0 ETH (if not explicitly disallowed)", async function () {
      const userBalanceBefore = await ethers.provider.getBalance(user1.address);
      const faucetBalanceBefore = await ethers.provider.getBalance(
        faucet.address
      );

      const tx = await faucet.connect(user1).withdraw(0);
      const receipt = await tx.wait();
      const gasCost = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      const userBalanceAfter = await ethers.provider.getBalance(user1.address);
      const faucetBalanceAfter = await ethers.provider.getBalance(
        faucet.address
      );

      expect(userBalanceAfter).to.be.closeTo(
        userBalanceBefore.sub(gasCost),
        ethers.utils.parseEther("0.000001")
      );
      expect(faucetBalanceAfter).to.equal(faucetBalanceBefore);
    });
  });

  describe("withdrawAll()", function () {
    it("Should allow the owner to withdraw all ETH from the faucet", async function () {
      const ownerBalanceBefore = await ethers.provider.getBalance(
        owner.address
      );
      const faucetBalanceBefore = await ethers.provider.getBalance(
        faucet.address
      );

      const tx = await faucet.connect(owner).withdrawAll();
      const receipt = await tx.wait();

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      const faucetBalanceAfter = await ethers.provider.getBalance(
        faucet.address
      );

      const gasCost = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      expect(ownerBalanceAfter).to.be.closeTo(
        ownerBalanceBefore.add(faucetBalanceBefore).sub(gasCost),
        ethers.utils.parseEther("0.000001")
      );

      // Faucet's balance should be 0 after withdrawAll
      expect(faucetBalanceAfter).to.equal(0);
    });

    it("Should revert if a non-owner tries to call withdrawAll", async function () {
      await expect(faucet.connect(user1).withdrawAll()).to.be.revertedWith(
        "revert"
      ); // Standard Hardhat revert message for failed require in modifier
    });

    it("Should revert with 'Failed to send Ether' if owner.call fails (e.g., owner becomes a non-payable contract)", async function () {
      const initialFaucetBalance = await ethers.provider.getBalance(
        faucet.address
      );
      // Transfer almost all ETH to user1, leaving a very tiny amount (1 wei)
      await faucet
        .connect(owner)
        .withdraw(
          initialFaucetBalance.sub(
            ethers.utils.parseEther("0.000000000000000001")
          )
        );

      await expect(faucet.connect(owner).withdrawAll()).to.be.revertedWith(
        "Failed to send Ether"
      );
    });
  });

  // --- destroyFaucet() Function Tests ---
  describe("destroyFaucet()", function () {
    it("Should allow the owner to destroy the faucet and retrieve funds", async function () {
      const ownerBalanceBefore = await ethers.provider.getBalance(
        owner.address
      );
      const faucetBalanceBefore = await ethers.provider.getBalance(
        faucet.address
      );

      // Owner destroys the faucet
      const tx = await faucet.connect(owner).destroyFaucet();
      const receipt = await tx.wait();

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      const faucetBalanceAfter = await ethers.provider.getBalance(
        faucet.address
      );

      const gasCost = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      // Owner's balance should increase by the faucet's balance, minus gas fees
      expect(ownerBalanceAfter).to.be.closeTo(
        ownerBalanceBefore.add(faucetBalanceBefore).sub(gasCost),
        ethers.utils.parseEther("0.000001")
      );

      // Faucet's balance should be 0
      expect(faucetBalanceAfter).to.equal(0);

      // The contract code should no longer exist at its address
      expect(await ethers.provider.getCode(faucet.address)).to.equal("0x");
    });

    it("Should revert if a non-owner tries to destroy the faucet", async function () {
      await expect(faucet.connect(user1).destroyFaucet()).to.be.revertedWith(
        "revert"
      ); // Standard Hardhat revert message for failed require in modifier
    });
  });

  describe("onlyOwner modifier", function () {
    it("Should prevent non-owner from calling withdrawAll", async function () {
      await expect(faucet.connect(user1).withdrawAll()).to.be.reverted;
      const revertReason = await faucet
        .connect(user1)
        .withdrawAll()
        .catch((e) => e.message);
      expect(revertReason).to.include("revert");
    });

    it("Should prevent non-owner from calling destroyFaucet", async function () {
      await expect(faucet.connect(user2).destroyFaucet()).to.be.reverted;
      const revertReason = await faucet
        .connect(user2)
        .destroyFaucet()
        .catch((e) => e.message);
      expect(revertReason).to.include("revert");
    });
  });
});
