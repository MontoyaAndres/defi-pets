const { expect } = require("chai");

describe("DeFiPets contract", function () {
  it("Deployment, mint, update", async function () {
    const [owner] = await ethers.getSigners();

    const defiPets = await ethers.deployContract("DeFiPets");

    const tokenId = await defiPets.mintPet(owner.address, "pet-0");
    console.log('tokenId: ',tokenId)

    const updated = await defiPets.updatePet(0,10,20,30);
    console.log('updated: ',updated)
  });
});