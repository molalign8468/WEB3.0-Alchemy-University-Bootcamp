// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Contract {

    mapping(address => bool ) public members;
    function addMember(address _memeber)external{
        members[_memeber] = true;
    }
    
}