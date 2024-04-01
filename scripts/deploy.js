const hre = require('hardhat');

async function main() {
  const DeFiPets = await ethers.getContractFactory("DeFiPets");
  const defiPets = await DeFiPets.deploy();
  console.log("Contract deployed to:", defiPets.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});