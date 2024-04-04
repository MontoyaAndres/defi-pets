import * as React from "react";
import Head from "next/head";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import PetsIcon from "@mui/icons-material/Pets";

import theme from "../theme";
import Link from "next/link";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [walletAddress, setWalletAddress] = React.useState(null);

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x66eee",
            rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
            chainName: "Arbitrum Sepolia",
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
          },
        ],
      });

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            backgroundColor: "rgb(249 250 251)",
          }}
        >
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6" noWrap component="div">
                DeFi-Pets
              </Typography>
              <Typography variant="body1" noWrap>
              <HomeIcon />Home
              </Typography>
              <Typography variant="body1" noWrap>
              <FlagIcon />Leaderboard
              </Typography>
              <Typography variant="body1" noWrap>
              <PetsIcon />My Pets
              </Typography>
              {walletAddress ? (
                <Typography variant="body1" noWrap>
                  {walletAddress}
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ textTransform: "initial" }}
                  onClick={connectWallet}
                >
                  Connect
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Component
              {...pageProps}
              connectWallet={connectWallet}
              walletAddress={walletAddress}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
