// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract TemplateRegistry {
    // Create a new role identifier for the deployer
    struct AcceptedTemplates {
        uint256 tokenId;
        address nftContractAddress;
        uint256 acceptedTimestamp;
        bool isActive;
    }

    mapping(address => mapping(uint256 => AcceptedTemplates)) public acceptedTemplates;
    
    event TemplatedAccepted(uint256 indexed tokenId, address indexed nftContractAddress, uint256 acceptedTimestamp);
    event TemplatedRemoved(uint256 indexed tokenId, address indexed nftContractAddress, uint256 acceptedTimestamp);

    // Grant the DEFAULT_ADMIN_ROLE & DEPLOYER role to a specified account(owner)
    constructor() {
    }

    /*
     * @notice Update name of the registry
     * @param newName New name of the registry
     */
    function removeTemplate(uint256 _tokenId, address _nftContractAddress)
        external
    {
        acceptedTemplates[_nftContractAddress][_tokenId].isActive = false;
        emit TemplatedRemoved(_tokenId, _nftContractAddress, block.timestamp);
    }

    /*
     * @notice Update site of the registry
     * @param domain Domain of the site
     * @param siteCID CID of the site
     * @param deploymentLink Link to the deployment of the site
     */
    function addTemplate(
        uint256 _tokenId,
        address _nftContractAddress
    ) external {
        require(acceptedTemplates[_nftContractAddress][_tokenId].acceptedTimestamp == 0, "Template Already Added to Regsitry");

        acceptedTemplates[_nftContractAddress][_tokenId] = AcceptedTemplates({
            tokenId: _tokenId,
            nftContractAddress: _nftContractAddress,
            acceptedTimestamp: block.timestamp,
            isActive: true
        });

        emit TemplatedAccepted(_tokenId, _nftContractAddress, block.timestamp);
    }
}
