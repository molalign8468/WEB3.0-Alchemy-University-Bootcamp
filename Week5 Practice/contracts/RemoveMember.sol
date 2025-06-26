// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Contract {

    mapping(address => bool ) public members;
    function addMember(address _memeber)external{
        members[_memeber] = true;
    }
    function isMember(address _memeber) external view returns(bool){
        return members[_memeber];
    }
    function removeMember(address _x) external{
        members[_x] = false;
    }
}