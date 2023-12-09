// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenMarketplace is Ownable {
    constructor(address initialOwner, address _token) 
    Ownable(initialOwner) {
        token = IERC20(_token);
    }
    IERC20 public token;

    struct Listing {
        address seller;
        uint256 quantity;
        uint256 priceInWei;
        bool active;
    }

    Listing[] public listings;

    event ListingCreated(uint256 indexed listingId, address indexed seller, uint256 quantity, uint256 price);
    event ListingRemoved(uint256 indexed listingId);
    event OfferMade(uint256 indexed listingId, address indexed buyer, uint256 quantity, uint256 totalPrice);
    event OfferAccepted(uint256 indexed listingId, address indexed buyer, address indexed seller, uint256 quantity, uint256 totalPrice);

    modifier onlyActiveListing(uint256 listingId) {
        require(listings[listingId].active, "Listing is not active");
        _;
    }


    function createListing(uint256 quantity, uint256 price) external {
        require(quantity > 0, "Quantity must be greater than 0");
        require(price > 0, "Price must be greater than 0");

        uint256 listingId = listings.length;
        Listing storage newListing = listings.push();
        newListing.seller = msg.sender;
        newListing.quantity = quantity;
        newListing.priceInWei = price;
        newListing.active = true;

        emit ListingCreated(listingId, msg.sender, quantity, price);
    }

    function removeListing(uint256 listingId) external onlyOwner onlyActiveListing(listingId) {
        listings[listingId].active = false;
        emit ListingRemoved(listingId);
    }

    function makeOffer(uint256 listingId, uint256 quantity) external payable onlyActiveListing(listingId) {
        require(quantity > 0, "Quantity must be greater than 0");
        require(quantity <= listings[listingId].quantity, "Not enough available quantity");

        uint256 totalPrice = quantity * listings[listingId].priceInWei;
        require(msg.value == totalPrice, "Incorrect Ether amount sent");
        // token.transferFrom(msg.sender, address(this), totalPrice);

        emit OfferMade(listingId, msg.sender, quantity, totalPrice);
    }

    function acceptOffer(uint256 listingId, address buyer) external onlyOwner onlyActiveListing(listingId) {
        Listing storage listing = listings[listingId];
        uint256 quantity = listing.quantity;
        uint256 totalPrice = quantity * listing.priceInWei;

        // token.transfer(buyer, quantity);
        // token.transfer(listing.seller, totalPrice);

        // // Mark the listing as inactive
        // listing.active = false;
        // Transfer Ether to the seller
        payable(listing.seller).transfer(totalPrice);

        // Transfer the tokens to the buyer
        IERC20(token).transferFrom(listing.seller, buyer, quantity);

        // Mark the listing as inactive
        listing.active = false;

        emit OfferAccepted(listingId, buyer, listing.seller, quantity, totalPrice);
    }
}
