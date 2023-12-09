// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract CarbonCreditToken is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("CarbonCredit", "CC")
        Ownable(initialOwner)
        ERC20Permit("CarbonCredit")
    {}
    // Event emitted when new carbon credits are issued
    event CreditsIssued(address indexed recipient, uint256 amount);

    // Event emitted when carbon credits are retired (burned)
    event CreditsRetired(address indexed owner, uint256 amount);

    // Address of the account responsible for issuing carbon credits
    address private issuer;

    // Modifier to restrict certain functions to the issuer only
    modifier onlyIssuer() {
        require(msg.sender == issuer, "Not authorized");
        _;
    }

    // Function to issue new carbon credits
    function issueCredits(address recipient, uint256 amount) external onlyIssuer {
        _mint(recipient, amount);
        emit CreditsIssued(recipient, amount);
    }

    // Function to retire (burn) carbon credits
    function retireCredits(uint256 amount) external {
        _burn(msg.sender, amount);
        emit CreditsRetired(msg.sender, amount);
    }

    // Function to transfer carbon credits with an optional memo
    function transferWithMemo(address to, uint256 amount, string calldata memo) external {
        _transfer(msg.sender, to, amount);
        emit Transfer(msg.sender, to, amount);
        // Additional logic to record the memo or any other metadata
    }

    // Additional functions, such as allowance management, can be implemented as needed

    // Function to update the issuer address (in case of transfer of authority)
    function updateIssuer(address newIssuer) external onlyOwner {
        issuer = newIssuer;
    }
}