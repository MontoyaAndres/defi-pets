// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract DeFiPets is ERC721, ERC721Holder, Ownable {
    // The metadata API
    string private _baseURIString =
        "https://krebit-challenge.vercel.app/api/metadata?tokenId=";
    string private _contractURIString =
        "https://krebit-challenge.vercel.app/api/";

    // Tableland setup for storing DeFi-Pet metadata
    uint256 private _tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "defi_pets"; // Custom table prefix

    uint256 private _tokenIdCounter;

    // Holds core data for every pet minted
    struct DeFiPet {
        bool alive;
        //uint256 points;
        //string[] evolutionStage;
    }

    mapping(uint256 => DeFiPet) pets;

    constructor() ERC721("DeFiPets", "DFP") Ownable(_msgSender()) {
        _tableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id INTEGER PRIMARY KEY,"
                "owner TEXT,"
                "name TEXT,"
                "created INTEGER,"
                "points INTEGER,"
                "health INTEGER,"
                "evolutionStage INTEGER",
                _TABLE_PREFIX
            )
        );

        mintPet(_msgSender(),"Zero");
    }

    // Return the table ID
    function getTableId() external view returns (uint256) {
        return _tableId;
    }

    // Return the table name
    function getTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_TABLE_PREFIX, _tableId);
    }

    // The base URI used by tokenURI
    function _baseURI() internal view override returns (string memory) {
        return _baseURIString;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseURIString = baseURI;
    }

    function contractURI() public view returns (string memory) {
        return _contractURIString;
    }

    function setContractURI(string memory newContractURI) public onlyOwner {
        _contractURIString = newContractURI;
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
        TablelandDeployments.get().mutate(
            address(this), // Table owner, i.e., this contract
            _tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                _tableId,
                "id, owner, name, created, points, health, evolutionStage",
                string.concat(
                    tokenIdString, // Convert to a string
                    ",",
                    SQLHelpers.quote(ownerString),
                    ",",
                    SQLHelpers.quote(name),
                    ",",
                    SQLHelpers.quote(nowString),
                    ",0,100,0"
                )
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
    function updatePet(
        uint256 tokenId,
        uint256 points,
        uint256 health,
        uint256 evolutionStage
    ) public onlyOwner {
        require(pets[tokenId].alive, "DeFiPetNFT: update for nonexistent pet");

        if (health == 0) {
            pets[tokenId].alive = false;
        }

        // Set the values to update
        string memory setters = string.concat(
                "points = ",
                Strings.toString(points),
                ", ",
                "health = ",
                Strings.toString(health),
                ", ",
                "evolutionStage = ",
                Strings.toString(evolutionStage)
                );
        // Specify filters for which row to update
        string memory filters = string.concat("id=", Strings.toString(tokenId));
        // Mutate a row at `id` with a new `val`
        TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, setters, filters)
        );
    }

    /* function tokenURI(uint256 tokenId) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(tokenId);
    }*/

    /* function totalSupply() override public view returns (uint256) {
      return _tokenIdCounter;
    }*/
}
