import React from "react";
import {
  Typography,
  Grid,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@material-ui/core";
import QrCode from "./QrCode";
import firebase from "../../Firebase";
import FormContext from "../FormContext";
import { ExpandMore, Person } from "@material-ui/icons";
import CopyLink from "./CopyLink";

export default function Referral(props) {
  const { handleChange, expanded } = props;
  const formData = React.useContext(FormContext);
  const { values } = formData;

  const [myReferrals, setMyReferrals] = React.useState([]);
  const [registered, setRegistered] = React.useState([]);

  React.useEffect(() => {
    const myRef = firebase
      .firestore()
      .collection("Users")
      .where("referredBy", "==", values.userId);

    myRef.onSnapshot(snapshot => {
      let fbData = [];

      console.log("snapshot", snapshot);
      snapshot.docs.forEach(doc => {
        fbData = [...fbData, doc.data()];
        console.log("referral data", doc.data());
      });
      setMyReferrals(fbData);
    });
    console.log("userId", values.userId);
  }, [values.userId]);
  React.useEffect(() => {
    const myRef = firebase
      .firestore()
      .collection("Users")
      .where("status", "==", "Unpaid")
      .orderBy("created");

    myRef.onSnapshot(snapshot => {
      let allPlayers = [];

      console.log("playersSnapshot", snapshot);
      snapshot.docs.forEach(doc => {
        allPlayers = [...allPlayers, doc.data()];
        console.log("allplayer data", doc.data());
      });
      setRegistered(allPlayers);
    });
  }, []);
  const userId = values.userId;
  const urlPrefix =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kul-spring-20.firebaseapp.com";
  const url = `${urlPrefix}/${userId}`;

  return (
    <>
      <ExpansionPanel
        expanded={expanded === "referral"}
        onChange={handleChange("referral")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography variant="body2">Refer a Friend</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Box>
            <Typography align="center">Your QR code!</Typography>
            <Box p="1em" style={{ display: "flex", justifyContent: "center" }}>
              <QrCode url={url} />
            </Box>
            <Typography align="center">Or copy your referral link:</Typography>
            <CopyLink />
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "myReferrals"}
        onChange={handleChange("myReferrals")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          {`My Referrals (${myReferrals.length})`}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List dense>
            {myReferrals.length === 0 ? (
              <Typography>Sorry no referrals yet</Typography>
            ) : (
              myReferrals.map((referral, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {referral.photoUrl ? (
                      <div>
                        <img
                          style={{
                            height: "35px",
                            width: "35px",
                            objectFit: "cover"
                          }}
                          src={referral.photoUrl}
                          alt={referral.firstName}
                        />
                      </div>
                    ) : (
                      <Person />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      referral.firstName
                        ? `${referral.firstName} ${referral.lastName}`
                        : referral.email
                    }
                    secondary={referral.status}
                  />
                </ListItem>
              ))
            )}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "allRegistered"}
        onChange={handleChange("allRegistered")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          {`Currently Registered (${registered.length})`}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List dense>
            {registered.length === 0 ? (
              <Typography>None Yet!</Typography>
            ) : (
              registered.map((player, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {player.photoUrl ? (
                      <div>
                        <img
                          style={{
                            height: "35px",
                            width: "35px",
                            objectFit: "cover"
                          }}
                          src={player.photoUrl}
                          alt={player.firstName}
                        />
                      </div>
                    ) : (
                      <Person />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      player.firstName
                        ? `${player.firstName} ${player.lastName}`
                        : player.email
                    }
                    secondary={player.status}
                  />
                </ListItem>
              ))
            )}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}
