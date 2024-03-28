import { Button, TextField } from "@mui/material";
import { Wrapper } from "./styles";

export const Home = () => {
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
