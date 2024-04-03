import { Fragment } from "react";

import { TextField, Button, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { Wrapper } from "./styles";

export const Leaderboard = (props) => {
  return (
    <Wrapper>
      <div className="titles">
        <Typography variant="h4" className="title">
          Top 10 DeFi-Pets
        </Typography>
        <Typography variant="h6" className="description">
          The cutest and most valuable DeFi-Pets in the community.
        </Typography>
      </div>
      <div className="list">
        <List
          sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}
        >
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
                      {" — I'll be in your neighborhood doing errands this…"}
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </div>
    </Wrapper>
  );
};
