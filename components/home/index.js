import { useEffect, Fragment, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { ethers } from "ethers";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Wrapper } from "./styles";

import defiPets from "../../schemas/defiPets.json" assert { type: "json" };

export const Home = (props) => {
  const { walletAddress } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [mintAlready, setMintAlready] = useState(false);

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

  const handleOpenDialog = (value) => {
    setOpenDialog(value);
  };

  const handleAlreadyMint = (value) => {
    setMintAlready(value);
  };

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
    <>
      {openDialog && (
        <Dialog
          open={open}
          onClose={() => handleOpenDialog(false)}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const name = formJson.name;

              if (!name) return;

              console.log(name);
              handleOpenDialog(false);
            },
          }}
        >
          <DialogTitle>Mint pet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Mint you pet here, enter the name of the pet
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleOpenDialog(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      )}
      <Wrapper>
        <div className="titles">
          <Typography variant="h4" className="title">
            Welcome to DeFi Pets
          </Typography>
          <Typography variant="h6" className="description">
            DeFi-Pets is a collection of 10,000 unique and adorable pets living
            on the blockchain. Each pet is an NFT, and the owner of the NFT has
            the right to name the pet and participate in various activities.
          </Typography>
        </div>
        <div className="elements">
          <div className="element">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 361 }}
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
                  onClick={() => handleOpenDialog(true)}
                >
                  Mint
                </Button>
              </CardActions>
            </Card>
          </div>
          <div>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontWeight: 600 }}
            >
              Top 10 DeFi-Pets
            </Typography>
            <div className="leaderboard">
              <List sx={{ bgcolor: "background.paper" }}>
                {new Array(10).fill(null).map((_, index) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://cdn-icons-png.flaticon.com/512/5957/5957125.png"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Ali Connors
                            </Typography>
                            {
                              " — I'll be in your neighborhood doing errands this…"
                            }
                          </Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))}
              </List>
            </div>
          </div>
        </div>
        <div className="titles">
          <Typography variant="h4" className="title">
            My DeFi Pets
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
                  onClick={() => {
                    console.log("jhey");
                  }}
                >
                  Open in Open sea
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Wrapper>
    </>
  );
};
