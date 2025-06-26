// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Contract {
	enum ConnectionTypes { 
		Unacquainted,
		Friend,
		Family
	}
	
	mapping(address => mapping(address => ConnectionTypes)) public connections;
	function connectWith(address other, ConnectionTypes connectionType) external {
		connections[msg.sender][other] = connectionType;
	}
}