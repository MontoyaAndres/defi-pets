import { useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { ethers } from "ethers";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { Wrapper } from "./styles";

import defiPets from "../../schemas/defiPets.json" assert { type: "json" };

export const Home = (props) => {
  const { walletAddress } = props;
  console.log(walletAddress);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });

      window.ethereum.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          window.location.reload();
        }
      });
    }
  }, []);

  async function mintPet() {
    try {
      // create provider from Metamask
      const provider = new ethers.BrowserProvider(window.ethereum);
      // get the account that will pay for the trasaction
      const signer = await provider.getSigner();

      let contract = new ethers.Contract(
        defiPets.arbitrumSepolia,
        defiPets.abi,
        signer
      );

      const tx = await contract.mintPet(walletAddress, "Pet Name");
      await tx.wait();
      const receipt = await provider.getTransactionReceipt(tx.hash);
      const tokenId = parseInt(receipt.logs[1].topics[3], 16);
      console.log("new tokenId", tokenId); // This is the new tokenID, go to tokenPage
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <div className="titles">
        <Typography variant="h4" className="title">
          Welcome to DeFi Pets
        </Typography>
        <Typography variant="h6" className="description">
          DeFi-Pets is a collection of 10,000 unique and adorable pets living on
          the blockchain. Each pet is an NFT, and the owner of the NFT has the
          right to name the pet and participate in various activities.
        </Typography>
      </div>
      <div className="cards">
        {new Array(6).fill(0).map((_, index) => (
          <Card sx={{ maxWidth: 345 }} key={index}>
            <CardMedia
              sx={{ height: 140 }}
              image="/photo_4931793251464228547_x.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Egg
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                style={{ fontWeight: 500 }}
              >
                Mint
              </Button>
              <Button
                size="small"
                color="secondary"
                style={{ fontWeight: 500 }}
              >
                Share
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Wrapper>
  );
};
