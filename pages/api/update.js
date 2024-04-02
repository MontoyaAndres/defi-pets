import 'dotenv/config';
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider, Contract } from "ethers";
import defiPets from '../../schemas/defiPets.json' assert { type: 'json' };


const getPet = async (tokenId) => {
  // Connect to the database
  const db = new Database();
  const root = `SELECT * FROM ${process.env.TABLELAND_NAME}`;
  const where = `WHERE id = '${tokenId}'`;
  const statement = `${root} ${where}`;
  const pets = await db.prepare(statement).all();
  console.log('pets from db:', pets);
  if (pets.results.length > 0) {
    return pets.results[0];
  }
}

const updatePet = async (tokenId, points, health, evolutionStage) => {
  const wallet = new Wallet(process.env.SEPOLIA_TESTNET_PRIVATE_KEY);
  const provider = getDefaultProvider("https://sepolia-rollup.arbitrum.io/rpc");
  const signer = wallet.connect(provider);

  let contract = new Contract(
    defiPets.arbitrumSepolia,
    defiPets.abi,
    signer
  )

  const updateTx = await contract.updatePet(tokenId, points, health, evolutionStage);
  console.log('updateTx on contract:', updateTx);
}

const getGuildRoles = async (userAddress) => {
  const roles = await fetch(
    `https://api.guild.xyz/v1/guild/member/${process.env.GUILD_ID}/${userAddress}`,
    {
      method: 'GET'
    }
  ).then(result => result.json());
  const actives = roles.filter(r => {
    return r.access ? true : false;
  });
  console.log('active roles from guild:', actives);
};

const getDeFiPositions = async (userAddress) => {
  const url = `https://api.zerion.io/v1/wallets/${userAddress}/positions/?filter[positions]=only_complex&currency=usd&filter[trash]=only_non_trash&sort=value`;
  const positions = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Basic ${process.env.ZERION_API_KEY}`
      }
    }
  ).then(result => result.json());

  const deposits = positions.data.filter(p => {
    return p.attributes.position_type == "deposit" ? true : false;
  }).length;
  const loans = positions.data.filter(p => {
    return p.attributes.position_type == "loan" ? true : false;
  }).length;
  const stakes = positions.data.filter(p => {
    return p.attributes.position_type == "staked" ? true : false;
  }).length;
  const locks = positions.data.filter(p => {
    return p.attributes.position_type == "locked" ? true : false;
  }).length;
  const rewards = positions.data.filter(p => {
    return p.attributes.position_type == "reward" ? true : false;
  }).length;
  const airdrops = positions.data.filter(p => {
    return p.attributes.position_type == "airdrop" ? true : false;
  }).length;
  return {
    deposits,
    loans,
    stakes,
    locks,
    rewards,
    airdrops
  }

};


export default async function handler(req, res) {
  const { tokenId } = req.query;

  // 0) Get current Pet metadata
  const pet = await getPet(tokenId);

  //TODO:  
  if (pet) {
    // 1) Call getGuildRoles(pet.owner) 

    //const roles = await getGuildRoles(pet.owner);


    // 2) Call getDeFiActivity(pet.owner) 

    //const defi = await getDeFiPositions(pet.owner);
    const defiActivity = await getDeFiPositions('0xd6eeF6A4ceB9270776d6b388cFaBA62f5Bc3357f');
    console.log('DeFi Activity:', defiActivity);

    // 3) Compare if pet.points/health needs to be updated on the contract

    // Update pet attributes based on DeFi activities
    let updatedHealth = pet.health + (defiActivity.deposits * 10) + (defiActivity.stakes * 20) - (defiActivity.locks * 15);
    let updatedPoints = pet.points + (defiActivity.rewards * 5) + (defiActivity.airdrops * 1) - (defiActivity.loans * 5);
    let updatedEvolutionStage = pet.evolutionStage;

    // Define thresholds for evolution stages
    const evolutionCriteria = [
      { health: 20, points: 10 }, // Criteria to evolve from stage 0 to 1
      { health: 50, points: 30 }, // Criteria to evolve from stage 1 to 2
      { health: 80, points: 50 }  // Criteria to evolve from stage 2 to 3
    ];

    // Check if pet meets criteria for the next evolution stage
    if (pet.evolutionStage < evolutionCriteria.length &&
      updatedHealth >= evolutionCriteria[pet.evolutionStage].health &&
      updatedPoints >= evolutionCriteria[pet.evolutionStage].points) {
      updatedEvolutionStage = pet.evolutionStage + 1;
    }
    let tokenNumber = Number(tokenId);
    if (isNaN(tokenNumber)) {
      tokenNumber = ethers.BigNumber.from('0x' + tokenId).toString();
    }

    const newAttributes = {tokenNumber,updatedPoints,updatedHealth,updatedEvolutionStage} 
    console.log("New Pet attributes: ",newAttributes)

    // 4) Update table via contract or tableland SDK
    const updated = await updatePet(tokenNumber,updatedPoints,updatedHealth,updatedEvolutionStage);

    return res.json(newAttributes);
  }


  


}
