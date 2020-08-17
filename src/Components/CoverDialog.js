import React from "react";
import {
  Dialog,
  Button,
  Typography,
  Box,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
} from "@material-ui/core";
import FormContext from "./FormContext";
import FormContainer from "./FormContainer";
import { ExpandMore } from "@material-ui/icons";
const LeaguePhoto = require("../Assets/LeaguePhoto.jpg");

export default function CoverDialog({ open, onClose }) {
  const formData = React.useContext(FormContext);

  const { language } = formData;

  function BodyText(props) {
    return (
      <Typography
        style={{ margin: "1em 0", color: "white" }}
        variant="body2"
        align="center"
      >
        <strong>{props.children}</strong>
      </Typography>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <FormContainer>
        <Box marginY="1em" width="100%">
          <Typography variant="h5" align="center">
            {language.greetingTitle}
          </Typography>
        </Box>
        <Box
          style={{
            margin: "0 -2em 1em",

            backgroundImage: `url(${LeaguePhoto})`,
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              padding: "2em 1em",
              backgroundColor: `rgba(80,20,20,.6)`,
            }}
          >
            {language.greetingBody.map((x) => (
              <BodyText key={x}>{x}</BodyText>
            ))}
          </div>
        </Box>
        {/* <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            {language.whatGet}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {language.getList.map((y) => (
                <ListItem key={y}>
                  <ListItemText primary={y} />
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}

        {/* <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            {language.schedule}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              <ListItem>
                <ListItemText primary={language.schedBasics} />
              </ListItem>
              {language.schedDates.map(x => (
                <ListItem key={x}>
                  <ListItemText primary={x} />
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
        <Button
          style={{ margin: "1em 0" }}
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          {language.ready}
        </Button>
      </FormContainer>
    </Dialog>
  );
}
