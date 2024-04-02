import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from '../button';
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

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x66eee",
          rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
          chainName: "Arbitrum Sepolia",
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18
          },
          blockExplorerUrls: ["https://sepolia.arbiscan.io/"]
        }]
      });

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
      const provider = new ethers.BrowserProvider(window.ethereum)
      // get the account that will pay for the trasaction
      const signer = await provider.getSigner()

      let contract = new ethers.Contract(
        defiPets.arbitrumSepolia,
        defiPets.abi,
        signer
      )

      const tx = await contract.mintPet(walletAddress, "Pet Name");
      await tx.wait();
      const receipt = await provider.getTransactionReceipt(tx.hash);
      const tokenId = parseInt(receipt.logs[1].topics[3], 16);
      console.log('new tokenId', tokenId); // This is the new tokenID, go to tokenPage


    } catch (error) {
      console.error(error);
    }
  }

  if (!walletAddress) {
    return (
      <NotWallet>
        
        <div className="connect-button">
            <Button
              text="Connect"
              onClick={() => connectWallet()}
            />
          </div>
      </NotWallet>
    );
  }

  return (
    <Wrapper>
      <div className="left">
        <div className="emoji">🥚</div>
        <div className="buttons">
          <div className="connect-button">
            <Button
              text="Mint"
              onClick={() => mintPet()}
            />
          </div>
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
