import { useEffect, Fragment, useState } from "react";
import { useRouter } from 'next/router';
import 'dotenv/config';
import axios from "axios";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import EggIcon from '@mui/icons-material/Egg';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CookieIcon from '@mui/icons-material/Cookie';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import WashIcon from '@mui/icons-material/Wash';
import SchoolIcon from '@mui/icons-material/School';

import { Wrapper } from "./styles";

import { Database } from "@tableland/sdk";
const db = new Database();
import defiPets from "../../schemas/defiPets.json" assert { type: "json" };

export const Home = (props) => {
  const { walletAddress } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPet, setCurrentPet] = useState({});
  const [myPets, setMyPets] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("idle");
  const { query } = useRouter();

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

  const getPet = async (tokenId) => {
    const root = `SELECT * FROM ${process.env.NEXT_PUBLIC_TABLELAND_NAME}`;
    const where = `WHERE id = '${tokenId}'`;
    const statement = `${root} ${where}`;
    const pets = await db.prepare(statement).all();
    console.log('single pet from db:', pets);
    if (pets.results.length > 0) {
      setCurrentPet(pets.results[0]);
    }
  }

  const getMyPets = async () => {
    const root = `SELECT * FROM ${process.env.NEXT_PUBLIC_TABLELAND_NAME}`;
    const where = `WHERE owner = '${walletAddress}'`;
    const statement = `${root} ${where}`;
    const pets = await db.prepare(statement).all();
    console.log('All my pets from db:', pets);
    if (pets.results.length > 0) {
      setMyPets(pets.results);
    }
  }

  const getLeaders = async () => {
    const statement = `SELECT * FROM ${process.env.NEXT_PUBLIC_TABLELAND_NAME} order by points desc limit 10`;
    const pets = await db.prepare(statement).all();
    console.log('Point leaders from db:', pets);
    if (pets.results.length > 0) {
      setLeaders(pets.results);
    }
  }

  useEffect(() => {
    if (!window) return;
    console.log('url query:', query);
    //TODO: it fails:
    const currentTokenId = parseInt(query.tokenId);
    //const currentTokenId = 1;
    if (currentTokenId) getPet(currentTokenId);

    getLeaders();

  }, []);

  useEffect(() => {
    if (!window) return;
    getMyPets();

  }, [walletAddress]);


  useEffect(() => {
    if (!window) return;

    getDataModel(
      "You are a DeFiPet, an AI onboarding bot part of DeFiPets that guides users through the process of starting with DeFi, explaining concepts, and helping them make their first transactions. Give me a welcome to DefiPets, tell me how can I play on DeFiPets, and give me a suggestion of next questions to ask to learn more about DeFi.",
      []
    );
  }, []);

  const getDataModel = async (message, history = []) => {
    try {
      const payload = {
        question: message,
        chat_history: history,
        knowledge_source_id: process.env.NEXT_PUBLIC_FLOCK_API_ID,
      };
      const headers = {
        "x-api-key": process.env.NEXT_PUBLIC_FLOCK_API_KEY,

      };

      const response = await axios.post(
        `https://rag-chat-ml-backend-prod.flock.io/chat/conversational_rag_chat`,
        payload,
        {
          headers,
        }
      );

      // TODO: set here history for first message
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDialog = (value) => {
    setOpenDialog(value);
  };

  const handleSendMessage = async (message) => {
    setHistory((prevValues) => [...prevValues, { message, type: "user" }]);
    setMessage("");

    setStatusMessage("loading");
    const aiResponse = await getDataModel(
      message,
      history.map((item) => item.message)
    );
    // TODO: save ai response in history
    setStatusMessage("idle");
  };

  const handleMessage = (event) => {
    if (statusMessage === "loading") return;

    if (event.key === "Enter") {
      handleSendMessage(event.target.value);
      return;
    }

    setMessage(event.target.value);
  };

  async function mintPet(name) {
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

      const tx = await contract.mintPet(walletAddress, name);
      await tx.wait();
      const receipt = await provider.getTransactionReceipt(tx.hash);
      const tokenId = parseInt(receipt.logs[1].topics[3], 16);
      console.log("new tokenId", tokenId);
      if (tokenId) getPet(tokenId);
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
              mintPet(name)
              handleOpenDialog(false);
            },
          }}
        >
          <DialogTitle>Mint a new DefiPet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Assign a name for your pet:
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
            <Button type="submit"><EggIcon />Mint</Button>
          </DialogActions>
        </Dialog>
      )}
      <Wrapper>
        <div className="titles">
          <Typography variant="h4" className="title">
            Welcome to DeFi Pets
          </Typography>
          <Typography variant="h6" className="description">
            Unleash the power of DeFi through a world of playful pets, where nurturing your AI companion unlocks a universe of knowledge in decentralized finance.
          </Typography>

          <ul>
            <li>Arbitrum Contract: <a target="_blank" href="https://sepolia.arbiscan.io/address/0x23ff5fe7b22e00888ca01949761c5bef4c1ff40b">0x23ff5fe7b22e00888ca01949761c5bef4c1ff40b</a></li>
            <li>Tableland Table: <a target="_blank" href="https://studio.tableland.xyz/table/defi_pets_421614_477">defi_pets_421614_477</a></li>
            <li>Flock AI Model: <a target="_blank" href="https://beta.flock.io/model/cluhak6ok00a7d20crl7n6uh8">DeFiPets</a></li>
            <li>Opensea: <a target="_blank" href="https://testnets.opensea.io/collection/defipets-1">DeFiPets</a></li>
          </ul>

        </div>
        <div className="elements">
          <div className="element">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 361 }}
                image={"/stage_" + (currentPet.id ? currentPet.evolutionStage : 0) + ".jpg"}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {currentPet.id ? currentPet.name : "DefiPets are Fun!"}
                </Typography>
                {currentPet.id && (
                  <>
                    <Typography gutterBottom variant="h6" component="div">
                      <EmojiEventsIcon /> Points: {currentPet.points}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      <InvertColorsIcon /> Health:  {currentPet.health}
                      <Slider
                        marks={[
                          {
                            value: 0,
                            label: '0%',
                          },
                          {
                            value: 100,
                            label: '100%',
                          },
                        ]}
                        aria-label="Health"
                        step={null}
                        defaultValue={currentPet.health}
                        valueLabelDisplay="auto"
                        color="secondary"
                      />
                    </Typography>
                  </>
                )}
                <Typography variant="body2" color="text.secondary">
                  Each DeFi action (Deposits, Stakes, Rewards) correlates with pet care tasks (Feeding, Training, Rewarding), influencing your pet's health and happiness.
                </Typography>
              </CardContent>
              {currentPet.id ? (
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    style={{ fontWeight: 500 }}
                  >
                    <CookieIcon /> Feed
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    style={{ fontWeight: 500 }}
                  >
                    <SchoolIcon /> Train
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    style={{ fontWeight: 500 }}
                  >
                    <WashIcon /> Clean
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    style={{ fontWeight: 500 }}
                  >
                    <SportsBaseballIcon />Play
                  </Button>
                </CardActions>
              ) : (
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    style={{ fontWeight: 500 }}
                    onClick={() => handleOpenDialog(true)}
                  >
                    <EggIcon /> Mint
                  </Button>
                </CardActions>
              )}
            </Card>
          </div>
          {currentPet.id ? (
            <div className="chat">
              <div className="chat-box">
                <p className="ai">Hello I'm an AI system</p>
                <p className="user">Hello I'm an user from the Dark web</p>
                <p className="ai">Hello I'm an AI system</p>
                <p className="user">Hello I'm an user from the Dark web</p>
                <p className="ai">Hello I'm an AI system</p>
              </div>
              <TextField
                className="input"
                placeholder="Enter message"
                onChange={handleMessage}
                onKeyDown={handleMessage}
                value={message}
              />
            </div>
          ) : (
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
                  {leaders.length > 0 && leaders.map((leader, index) => (
                    <>
                      <ListItem alignItems="flex-start" key={index}>
                        <ListItemAvatar>
                          #{index + 1}<EmojiEventsIcon />
                        </ListItemAvatar>
                        <ListItemText
                          primary={leader.name}
                          secondary={
                            <Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Points: {leader.points}
                              </Typography>
                              &nbsp; - Owner: {leader.owner}
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
          )}
        </div>
        {currentPet.id && (
          <div className="subelements">
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
                {leaders.length > 0 && leaders.map((leader, index) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        #{index + 1}<EmojiEventsIcon />
                      </ListItemAvatar>
                      <ListItemText
                        primary={leader.name}
                        secondary={
                          <Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Points: {leader.points}
                            </Typography>
                            &nbsp; - Owner: {leader.owner}
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
        )}
        {myPets.length > 0 && (
          <>
            <div className="titles">
              <Typography variant="h4" className="title">
                My DeFi Pets
              </Typography>
            </div>
            <div className="cards">
              {myPets.length > 0 && myPets.map((myPet, index) => (
                <Card sx={{ maxWidth: 345 }} key={index}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={"/stage_" + index + ".jpg"}
                    title={myPet.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {myPet.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      <EmojiEventsIcon /> Points: {myPet.points}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      <InvertColorsIcon /> Health: {myPet.health}
                      <Slider
                        marks={[
                          {
                            value: 0,
                            label: '0%',
                          },
                          {
                            value: 100,
                            label: '100%',
                          },
                        ]}
                        aria-label="Health"
                        step={null}
                        defaultValue={myPet.health}
                        valueLabelDisplay="auto"
                        color="secondary"
                      />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="secondary"
                      style={{ fontWeight: 500 }}
                      onClick={() => {
                        setCurrentPet(myPet.id)
                      }}
                    >
                      Select
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
};
