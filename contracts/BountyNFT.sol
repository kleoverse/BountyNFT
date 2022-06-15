// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BountyNFT is ERC721, Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;


    constructor() ERC721("BountyNFT", "KLVRSBNFT") {
    }
    function createBountyNFT(address _to, string memory _uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _mint(_to, tokenId);
        _setTokenURI(tokenId, _uri);
    }


    function burn(uint256 id) external {
        require(
            _isApprovedOrOwner(_msgSender(), id),
            "ERC721: caller is not approved or owner"
        );
        _burn(id);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721) {
        require(
            from == address(0) || to == address(0),
            "BountyNFT: non transferrable token"
        );
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
