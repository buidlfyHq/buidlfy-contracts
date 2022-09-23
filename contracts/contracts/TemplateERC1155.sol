// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC1155/ERC1155.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Implementation of the basic standard multi-token.
 * See https://eips.ethereum.org/EIPS/eip-1155
 * Originally based on code by Enjin: https://github.com/enjin/erc-1155
 *
 * _Available since v3.1._
 */
contract SpheronERC1155 is ERC1155URIStorage, ERC1155Supply, Ownable {
    uint256 public id_counter;
    string public name = "Spheron Buidlfy Templates";
    string public symbol = "SBT";

    constructor(string memory _uri) ERC1155("") {
    }

    function mint(
        string memory _uri
    ) external onlyOwner {
        _mint(msg.sender, id_counter, 1 * 10**18, "");
        _setURI(id_counter, _uri);
        id_counter++;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Supply, ERC1155) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function uri(uint256 tokenId) public view virtual override(ERC1155URIStorage, ERC1155) returns (string memory) {
        return super.uri(tokenId);
    }
}
