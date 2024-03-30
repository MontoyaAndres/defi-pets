const hre = require('hardhat');

async function main() {

  const DeFiPets = await ethers.getContractFactory("DeFiPets");
    const defiPets = await DeFiPets.deploy('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    await defiPets.deployed();
    console.log("Contract deployed to:", defiPets.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});