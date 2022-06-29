// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WeddingNFT is ERC721Enumerable, Ownable {
    
    string _baseTokenURI;
    uint256 public _minPrice = 0.00001 ether; 
    bool public _paused; 
    uint256 public maxTokenIds = 20;
    uint256 public tokenIds;

    modifier onlyWhenNotPaused {
        require(!_paused, "Minting is paused!")
    }

    constructor (string memory baseURI) ERC721("WeddingNFT") {
        _baseTokenURI = baseURI; 
    }

    function setPaused(bool val)  public onlyOwner () {
        _paused = val; 
    }

    function mint() public payable onlyWhenNotPaused {
        require(tokenIds < maxTokenIds, "Exceed max NFT supply");
        require(msg.value >= _minPrice, "Ether sent is not correct");
        tokenIds += 1; 
        _safeMint(msg.sender, tokenIds)
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(send, "Failed to send Ether");
    }

    receive() external payable {}
    fallback() external payable {}

}