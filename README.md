# DeFi-Pets

> Unleash the power of DeFi through a world of playful pets, where nurturing your AI companion unlocks a universe of knowledge in decentralized finance.

### The Challenge
While DeFi has revolutionized finance with its innovative protocols and financial models, it often presents a steep learning curve and lacks engaging, interactive elements that can appeal to a broader audience.

### Our Solution
DeFiPets addresses this gap by infusing the DeFi space with a layer of gamification and interactive learning. Through nurturing and evolving digital pets, users are naturally introduced to DeFi concepts and activities.


<ul>
          <li>
              Live Demo:
              <a
                target="_blank"
                href="https://defi-pets.vercel.app/"
              >
                https://defi-pets.vercel.app/
              </a>
            </li>
            <li>
              Arbitrum Contract:
              <a
                target="_blank"
                href="https://sepolia.arbiscan.io/address/0x23ff5fe7b22e00888ca01949761c5bef4c1ff40b"
              >
                0x23ff5fe7b22e00888ca01949761c5bef4c1ff40b
              </a>
            </li>
            <li>
              Tableland Table:
              <a
                target="_blank"
                href="https://studio.tableland.xyz/table/defi_pets_421614_477"
              >
                defi_pets_421614_477
              </a>
            </li>
            <li>
              Flock AI Model:
              <a
                target="_blank"
                href="https://beta.flock.io/model/cluhak6ok00a7d20crl7n6uh8"
              >
                DeFiPets
              </a>
            </li>
            <li>
              Opensea:
              <a
                target="_blank"
                href="https://testnets.opensea.io/collection/defipets-1"
              >
                DeFiPets
              </a>
            </li>
          </ul>



## How DeFiPets Works
- **Mint Your DeFiPet:** Start by minting an NFT that represents your unique digital pet, ready to grow and evolve.
- **Smart AI Companion:** Each pet is powered by a FLock AI bot, offering personalized DeFi strategies and insights, making your interactions smarter and your DeFi journey more informed.
- **DeFi Activities as Pet Care:** Each DeFi action (Deposits, Stakes, Rewards) correlates with pet care tasks (Feeding, - Training, Rewarding), influencing your pet's health and happiness.
- **Growth and Evolution:** Your pet evolves as you participate in DeFi, with each evolution stage unlocking new features and abilities.
- **Community and Leaderboard:** Engage with the DeFiPet community, compete in challenges, and climb the leaderboard to earn exclusive rewards.


## Architecture
- **Built on Arbitrum:** Optimizing for efficiency and speed on the Arbitrum layer to enhance user experience and reduce transaction costs.(See [/contracts/DeFiPets.sol](https://github.com/MontoyaAndres/defi-pets/blob/main/contracts/DeFiPets.sol))
- **Data Management with Tableland:** Leveraging Tableland for decentralized, secure storage of pet attributes, evolution data, and user interactions. (See [/pages/api/metadata.js](https://github.com/MontoyaAndres/defi-pets/blob/main/pages/api/metadata.js) and [/components/home/index.js](https://github.com/MontoyaAndres/defi-pets/blob/main/components/home/index.js))
- **AI Integration with FLock:** Utilizing FLock's decentralized machine learning capabilities to personalize pet behaviors and DeFi recommendations, creating a unique and adaptive experience for each user. (See [/pages/api/bot.js](https://github.com/MontoyaAndres/defi-pets/blob/main/pages/api/bot.js))
- **Real-Time DeFi Tracking with Zerion:** Integrated Zerion's API to monitor users' wallet positions, reflecting their DeFi activities directly on their DeFiPets. (See [/pages/api/update.js](https://github.com/MontoyaAndres/defi-pets/blob/main/pages/api/update.js))

## Install

```bash
yarn install
```

## Contracts

```bash
yarn compile
yarn test
yarn deploy
```

## Dev
Copy .env.example to .env and replace with your own development keys

```bash
yarn dev
```

