//official contract for MUT(Mohz Utility Token) a mintable ERC20 token following ERC20 token standards

//Note: constructor is not used to mint the 100 token because I decided to interact with the contract using SwisstronikJS.
//check path: scripts/mintMut.js to see the script minting 100 MUT and path: scripts/getTotalSupply.js to see script getting MUT totalsupply.
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MUT is ERC20, Ownable {
    //set name and symbol
    constructor() ERC20("Mohz Utility Token", "MUT") {}

    //mint amount of MUT passed to 'to' wallet
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}