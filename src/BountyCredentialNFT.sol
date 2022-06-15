// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BountyCredentialNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    struct BountyCredential {
        uint256 id;
    }
    constructor() ERC721("BountyCredentialsNFT", "KLVRSBNFT") {
    }
    function createBountyNFT(address _to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        BountyCredential bountyCredential = BountyCredential(tokenId);
        _mint(_to, tokenId);
    }
}
