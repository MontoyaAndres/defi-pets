import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { ethers } from "ethers";
import { NotWallet, Wrapper } from "./styles";

import defiPets from '../../schemas/defiPets.json' assert { type: 'json' };

export const Home = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });
    }
  }, []);

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async function mintPet() {
    try {
      // create provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // get the account that will pay for the trasaction
      const signer = provider.getSigner()

      let contract = new ethers.Contract(
        defiPets.arbitrumSepolia,
        defiPets.abi,
        signer
      )

      const tx = await contract.mint("Pet Name");

      console.log('transaction :>> ', tx)
      // wait for the transaction to actually settle in the blockchain
      await tx.wait()

    } catch (error) {
      console.error(error);
    }
  }

  if (!walletAddress) {
    return (
      <NotWallet>
        <Button variant="contained" onClick={connectWallet}>
          Connect Wallet
        </Button>
      </NotWallet>
    );
  }

  return (
    <Wrapper>
      <div className="left">
        <div className="emoji">🥚</div>
        <div className="buttons">
          <Button variant="contained">Feed</Button>
          <Button variant="contained">Mint</Button>
        </div>
      </div>
      <div className="right">
        <div className="box">
          <p className="ai">Hello I'm an AI system</p>
          <p className="user">Hello I'm an user from the Dark web</p>
          <p className="ai">Hello I'm an AI system</p>
          <p className="user">Hello I'm an user from the Dark web</p>
          <p className="ai">Hello I'm an AI system</p>
        </div>
        <TextField className="input" placeholder="Enter message" />
      </div>
    </Wrapper>
  );
};
