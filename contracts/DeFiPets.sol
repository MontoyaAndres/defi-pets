// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/URITemplate.sol";

contract DeFiPets is ERC721, ERC721Holder, Ownable {    
    
    // The metadata API
    string private _baseURIString = "https://krebit-challenge.vercel.app/api/metadata/";


    // Tableland setup for storing DeFi-Pet metadata
    ITablelandTables private tableland;
    string private tablelandTableName;
    uint256 private tablelandTableId;

     uint256 private _tokenIdCounter;

    // Holds core data for every pet minted
    struct DeFiPet {
        bool alive;
        //uint256 points;
        //string[] evolutionStage;
    }

    mapping(uint256 => DeFiPet) pets;

    constructor(address initialOwner)
        ERC721("DeFiPets", "DFP")
        Ownable(initialOwner)
        {
        // Initialize Tableland
        tableland = TablelandDeployments.get();

        tablelandTableId = tableland.createTable(
            address(this),
            string.concat(
                "CREATE TABLE defi_pets_",
                Strings.toString(block.chainid),
                " (",
                " id INTEGER PRIMARY KEY,",
                " owner TEXT,",
                " name TEXT,",
                " created INTEGER,",
                " points INTEGER,",
                " health INTEGER,",
                " evolutionStage INTEGER",
                ");"
            )
        );

        // Store the table name locally for future reference.
        tablelandTableName = string.concat(
            "defi_pets_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(tablelandTableId)
        );

    }


    // The base URI used by tokenURI
    function _baseURI() internal view override returns (string memory) {
        return _baseURIString;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
	    _baseURIString = baseURI;
    }

    /**
     * @dev Called whenever a user requests a new pet
     */
    function _createPet(
        address owner,
        string memory name,
        uint256 tokenId
    ) internal {
        string memory tokenIdString = Strings.toString(tokenId);
        string memory ownerString = Strings.toHexString(owner);
        string memory nowString = Strings.toString(block.timestamp);

        /*
         * insert a single row for the pet metadata
         */
        tableland.runSQL(
            address(this),
            tablelandTableId,
            string.concat(
                "INSERT INTO ",
                tablelandTableName,
                "(id, owner, name, created, points, health, evolutionStage) VALUES (",
                tokenIdString,
                ",'",
                ownerString,
                "',",
                name,
                "',",
                nowString,
                ",0,10,0);"
            )
        );
    }

    /**
    * @dev Called by players to make a new pet.
    */
    function mintPet(address to, string memory name) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _createPet(to, name, tokenId);
        pets[tokenId].alive = true;
        _safeMint(to, tokenId);
        _tokenIdCounter += 1;
        return tokenId;
    }

    // Function to update DeFi-Pet attributes and reflect in Tableland
    function updatePet(uint256 tokenId, uint256 points, uint256 health, uint256 evolutionStage) public onlyOwner {
        require(pets[tokenId].alive, "DeFiPetNFT: update for nonexistent pet");

        if (health == 0) {
            pets[tokenId].alive = false;
        }

        // Update attributes in Tableland
        string memory updateSQL = string(abi.encodePacked(
            "UPDATE ", tablelandTableName, " SET ",
            "points = ", Strings.toString(points), ", ",
            "health = ", Strings.toString(health), ", ",
            "evolutionStage = ", Strings.toString(evolutionStage),
            " WHERE id = ", Strings.toString(tokenId), ";"
        ));
        tableland.runSQL(address(this), tablelandTableId, updateSQL);

    }

    /* function tokenURI(uint256 tokenId) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(tokenId);
    }*/

   /* function totalSupply() override public view returns (uint256) {
      return _tokenIdCounter;
    }*/


}
