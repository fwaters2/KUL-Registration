import React from "react";
import moment from "moment";
import {
  Dialog,
  Button,
  Typography,
  Box,
  DialogActions,
  DialogTitle,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import FormContext from "./FormContext";
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
    <Dialog open={open} onClose={onClose} style={{ padding: "1em 2em" }}>
      <DialogTitle disableTypography={true}>
        <Typography variant="h5" align="center">
          {moment().isBefore("2020-09-21T23:59:59+08:00")
            ? `Early bird ends ${moment(
                "2020-09-21T23:59:59+08:00"
              ).fromNow()}!`
            : language.greetingTitle}
        </Typography>
      </DialogTitle>
      <Box
        style={{
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
          <BodyText></BodyText>
          {language.greetingBody.map((x) => (
            <BodyText key={x}>{x}</BodyText>
          ))}
        </div>
      </Box>
      <ExpansionPanel>
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
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          {language.schedule}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem>
              <ListItemText primary={language.schedBasics} />
            </ListItem>
            {language.schedDates.map((x) => (
              <ListItem key={x}>
                <ListItemText primary={x} />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <DialogActions>
        <Button
          style={{ margin: "1em 0" }}
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          {language.ready}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
