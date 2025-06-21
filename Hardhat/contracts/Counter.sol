// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function reset() public {
        count = 0;
    }
}

